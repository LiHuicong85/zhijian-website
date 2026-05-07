import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let query = client.from('cases').select('*').order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Cases API] Query error:', error);
      return NextResponse.json(
        { success: false, error: error.message, _debug: { source: 'external_supabase', url: 'https://pjqtjfmjhurarcnhvxgo.supabase.co' } },
        { status: 500 }
      );
    }

    // 字段名映射：数据库字段名带空格，转为前端友好的下划线格式
    const mappedData = (data || []).map((item: Record<string, unknown>) => ({
      ...item,
      project_achievements_cases: item['project achievements_cases'] || '',
    }));

    return NextResponse.json(
      { success: true, data: mappedData, _debug: { source: 'external_supabase', url: 'https://pjqtjfmjhurarcnhvxgo.supabase.co' } },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Cases API] Unexpected error:', message);
    return NextResponse.json(
      { success: false, error: message, _debug: { source: 'external_supabase', url: 'https://pjqtjfmjhurarcnhvxgo.supabase.co' } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const client = getSupabaseClient();

  try {
    const body = await request.json();
    const { title, company, category, description, image_url1, image_url2, theme_color, is_published, content_cases, project_achievements_cases } = body;

    const { error } = await client.from('cases').insert({
      title,
      company,
      category,
      description,
      image_url1,
      image_url2,
      theme_color,
      is_published: is_published ?? true,
      'content_cases': content_cases,
      'project achievements_cases': project_achievements_cases,
    });

    if (error) {
      console.error('[Cases API] Insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Cases API] Unexpected error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
