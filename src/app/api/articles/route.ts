import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, EXTERNAL_URL, SERVICE_ROLE_KEY } from '@/storage/database/supabase-client';

export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let query = client.from('articles').select('*').order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Articles API] Query error:', error);
      return NextResponse.json(
        { success: false, error: error.message, _debug: { source: 'external_supabase' } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data, _debug: { source: 'external_supabase' } },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Articles API] Unexpected error:', message);
    return NextResponse.json(
      { success: false, error: message, _debug: { source: 'external_supabase' } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, category, label_wen, is_published } = body;

    const insertData: Record<string, unknown> = {
      title,
      content,
      author,
      is_published: is_published ?? true,
    };
    if (category !== undefined) insertData.category = category;
    if (label_wen !== undefined) insertData.label_wen = label_wen;

    // Use REST API directly for reliable writes
    const restUrl = `${EXTERNAL_URL}/rest/v1/articles`;
    const response = await fetch(restUrl, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(insertData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[Articles API] POST failed:', response.status, text);
      return NextResponse.json({ success: false, error: `创建失败: ${response.status}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Articles API] POST error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
