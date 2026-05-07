import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import https from 'https';
import { EXTERNAL_URL, SERVICE_ROLE_KEY } from '@/storage/database/supabase-client';

const RESOLVED_IP = '104.18.38.10';

async function restRequest(path: string, method: string, body?: object) {
  const url = new URL(`${EXTERNAL_URL}/rest/v1${path}`);

  return new Promise<{ status: number; body: string }>((resolve, reject) => {
    const req = https.request(
      {
        hostname: RESOLVED_IP,
        port: 443,
        path: url.pathname + url.search,
        method,
        headers: {
          'Host': url.hostname,
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': method === 'POST' ? 'return=representation' : 'count=exact',
        },
        agent: new https.Agent({
          lookup: (_hostname: string, options: dns.LookupOptions, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void) => {
            callback(null, RESOLVED_IP, 4);
          },
        }),
      },
      (res) => {
        let data = '';
        res.on('data', (chunk: Buffer) => { data += chunk.toString(); });
        res.on('end', () => { resolve({ status: res.statusCode || 0, body: data }); });
      }
    );
    req.on('error', (e: Error) => reject(e));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// GET - 获取分类列表
export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') || 'case';
    const tableName = type === 'article' ? 'article_categories' : 'case_categories';

    const result = await restRequest(`/${tableName}?select=*&order=sort_order.asc`, 'GET');

    if (result.status !== 200) {
      console.error('[Categories API] GET error:', result.status, result.body);
      return NextResponse.json({ success: false, error: `获取分类失败: ${result.status}` }, { status: 500 });
    }

    const data = JSON.parse(result.body);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Categories API] GET error:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// POST - 新增分类
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, sort_order } = body;
    const tableName = type === 'article' ? 'article_categories' : 'case_categories';

    const result = await restRequest(`/${tableName}`, 'POST', { name, sort_order: sort_order || 0 });

    if (result.status !== 201 && result.status !== 200) {
      console.error('[Categories API] POST error:', result.status, result.body);
      return NextResponse.json({ success: false, error: `新增分类失败: ${result.status}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Categories API] POST error:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
