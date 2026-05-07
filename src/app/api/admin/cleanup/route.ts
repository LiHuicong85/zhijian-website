import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET() {
  const client = getSupabaseClient();

  try {
    // 使用普通查询获取count（不用head: true，因为返回的count为null）
    const [teamData, casesData, articlesData] = await Promise.all([
      client.from('team').select('id'),
      client.from('cases').select('id'),
      client.from('articles').select('id'),
    ]);

    const teamCount = teamData.data?.length ?? 0;
    const casesCount = casesData.data?.length ?? 0;
    const articlesCount = articlesData.data?.length ?? 0;

    return NextResponse.json({
      success: true,
      data: {
        teamCount: teamCount || 0,
        casesCount: casesCount || 0,
        articlesCount: articlesCount || 0,
      },
    }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Admin Cleanup] Error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST() {
  const client = getSupabaseClient();

  try {
    const { error: casesError } = await client.from('cases').delete().neq('id', 'placeholder');
    const { error: articlesError } = await client.from('articles').delete().neq('id', 'placeholder');

    if (casesError) console.error('[Admin Cleanup] Cases delete error:', casesError);
    if (articlesError) console.error('[Admin Cleanup] Articles delete error:', articlesError);

    const message = [casesError, articlesError].filter(Boolean).length > 0
      ? '部分清理失败'
      : '清理完成';

    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Admin Cleanup] Error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
