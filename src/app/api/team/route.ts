import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET() {
  const client = getSupabaseClient();

  try {
    const { data, error } = await client
      .from('team')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('[Team API] Query error:', error);
      return NextResponse.json(
        { success: false, error: error.message, _debug: { source: 'external_supabase', url: 'https://pjqtjfmjhurarcnhvxgo.supabase.co' } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data, _debug: { source: 'external_supabase', url: 'https://pjqtjfmjhurarcnhvxgo.supabase.co' } },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Team API] Unexpected error:', message);
    return NextResponse.json(
      { success: false, error: message, _debug: { source: 'external_supabase' } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const client = getSupabaseClient();

  try {
    const body = await request.json();
    const { name, role, description, avatar_url } = body;

    const { data, error } = await client.from('team').insert({
      name,
      role,
      description,
      avatar_url,
    }).select().single();

    if (error) {
      console.error('[Team API] Insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Team API] Unexpected error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
