import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;

  try {
    const { data, error } = await client.from('cases').select('*').eq('id', id).single();

    if (error) {
      console.error('[Cases API] Get by ID error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ success: false, error: '案例不存在' }, { status: 404 });
    }

    // 字段名映射：数据库字段名带空格，转为前端友好的下划线格式
    // 处理 data 可能是数组或对象的情况
    const mapItem = (item: Record<string, unknown>) => ({
      ...item,
      project_achievements_cases: item['project achievements_cases'] || '',
    });

    let mappedData: unknown;
    if (Array.isArray(data)) {
      mappedData = data.map(mapItem);
    } else if (data && typeof data === 'object') {
      mappedData = mapItem(data as Record<string, unknown>);
    } else {
      mappedData = data;
    }

    return NextResponse.json({ success: true, data: mappedData }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Cases API] Unexpected error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;

  try {
    const body = await request.json();
    const { title, company, category, description, image_url1, image_url2, theme_color, is_published, content_cases, project_achievements_cases } = body;

    const { error } = await client
      .from('cases')
      .update({ 
        title, 
        company, 
        category, 
        description, 
        image_url1, 
        image_url2, 
        theme_color, 
        is_published,
        'content_cases': content_cases,
        'project achievements_cases': project_achievements_cases,
      })
      .eq('id', id);

    if (error) {
      console.error('[Cases API] Update error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Cases API] Unexpected error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseClient();
  const { id } = await params;

  try {
    const { error } = await client
      .from('cases')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Cases API] Delete error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Cases API] Delete error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
