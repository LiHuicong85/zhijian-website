import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, EXTERNAL_URL, SERVICE_ROLE_KEY } from '@/storage/database/supabase-client';
import dns from 'dns';

// DNS cache
let cachedIp: string | null = null;
async function resolveIp(): Promise<string> {
  if (cachedIp) return cachedIp;
  return new Promise((resolve, reject) => {
    const hostname = new URL(EXTERNAL_URL).hostname;
    dns.resolve4(hostname, (err, addresses) => {
      if (err) reject(err);
      else { cachedIp = addresses[0]; resolve(cachedIp!); }
    });
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;

  try {
    const { data, error } = await client.from('articles').select('*').eq('id', id).single();

    if (error) {
      console.error('[Articles API] Get by ID error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ success: false, error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Articles API] Unexpected error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;
  const body = await request.json();

  try {
    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.label_wen !== undefined) updateData.label_wen = body.label_wen;
    if (body.is_published !== undefined) updateData.is_published = body.is_published;
    if (body.sort_order !== undefined) updateData.sort_order = body.sort_order;
    updateData.updated_at = new Date().toISOString();

    const { error } = await client
      .from('articles')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('[Articles API] Update error:', error);
      // SDK失败，尝试REST API
      await resolveIp();
      const hostname = new URL(EXTERNAL_URL).hostname;
      const restUrl = `${EXTERNAL_URL}/rest/v1/articles?id=eq.${id}`;

      const response = await fetch(restUrl, {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
          'Host': hostname,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('[Articles API] REST PUT failed:', response.status, text);
        return NextResponse.json({ success: false, error: `更新失败: ${response.status}` }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Articles API] PUT error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await resolveIp();
    const hostname = new URL(EXTERNAL_URL).hostname;

    const restUrl = `${EXTERNAL_URL}/rest/v1/articles?id=eq.${id}`;

    const response = await fetch(restUrl, {
      method: 'DELETE',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal',
        'Host': hostname,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[Articles API] DELETE failed:', response.status, text);
      return NextResponse.json({ success: false, error: `删除失败: ${response.status}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Articles API] DELETE error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
