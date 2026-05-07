import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================
// 外部用户 Supabase（直接访问）
// ============================================================
export const EXTERNAL_URL = 'https://pjqtjfmjhurarcnhvxgo.supabase.co';
const EXTERNAL_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcXRqZm1qaHVyYXJjbmh2eGdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk4ODIwNiwiZXhwIjoyMDkyNTY0MjA2fQ.2xZEq2lVnslTFOmm6CvFtjCnDahhB4suiOqWPE0FXgw';
export const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcXRqZm1qaHVyYXJjbmh2eGdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk4ODIwNiwiZXhwIjoyMDkyNTY0MjA2fQ.2xZEq2lVnslTFOmm6CvFtjCnDahhB4suiOqWPE0FXgw';

// ============================================================
// 自定义 DNS + fetch：绕过 undici DNS 问题
// ============================================================
function resolveHost(hostname: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const dns = require('dns');
    dns.lookup(hostname, (err: Error | null, address: string) => {
      if (err) reject(err);
      else resolve(address);
    });
  });
}

function makeCustomFetch(targetUrl: string, authKey: string) {
  const target = new URL(targetUrl);
  const targetHost = target.host;

  return async function customFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = typeof input === 'string' ? new URL(input) : (input instanceof URL ? input : new URL(input.toString()));
    const isExternal = url.hostname === targetHost;

    if (!isExternal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (globalThis as any).fetch(input, init);
    }

    const path = url.pathname + url.search;
    const method = init?.method || 'GET';

    // 收集 headers
    const headers: Record<string, string> = { 'host': targetHost };
    if (init?.headers) {
      if (Array.isArray(init.headers)) {
        init.headers.forEach(([k, v]) => {
          if (k !== 'host') headers[String(k).toLowerCase()] = String(v);
        });
      } else {
        Object.entries(init.headers as Record<string, string>).forEach(([k, v]) => {
          if (k.toLowerCase() !== 'host') headers[k.toLowerCase()] = String(v);
        });
      }
    }

    if (!headers['apikey']) headers['apikey'] = authKey;
    if (!headers['authorization']) headers['authorization'] = `Bearer ${authKey}`;
    // DELETE/PUT 需要明确的 Content-Length
    if ((method === 'DELETE' || method === 'PUT') && !headers['content-length']) {
      headers['content-length'] = '0';
    }

    const ip = await resolveHost(targetHost);
    const https = require('https');

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: ip,
          path,
          method,
          headers,
        },
        (res: { on: (e: string, cb: (c: Buffer) => void) => void; statusCode: number; headers: Record<string, string | string[] | undefined> }) => {
          const chunks: Buffer[] = [];
          res.on('data', (chunk: Buffer) => chunks.push(chunk));
          res.on('end', () => {
            const body = Buffer.concat(chunks);
            const respHeaders: Record<string, string> = {};
            Object.entries(res.headers).forEach(([k, v]) => {
              if (v) respHeaders[k] = Array.isArray(v) ? v.join(', ') : v;
            });
            const status = res.statusCode || 200;
            // 非 2xx 状态码视为错误
            if (status >= 400) {
              resolve(new Response(body, { status, headers: respHeaders, statusText: 'Error' }));
              return;
            }
            // 204 No Content 不能有 body
            if (status === 204 || body.length === 0) {
              resolve(new Response(null, { status, headers: respHeaders }));
            } else {
              resolve(new Response(body, { status, headers: respHeaders }));
            }
          });
        },
      );
      req.on('error', reject);
      if (init?.body) req.write(init.body);
      req.end();
    });
  };
}

// ============================================================
// 唯一客户端：外部 Supabase（只连这一个库）
// ============================================================
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(EXTERNAL_URL, EXTERNAL_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: makeCustomFetch(EXTERNAL_URL, EXTERNAL_KEY) as typeof fetch },
  });
  return _client;
}

export function getSupabaseAnonClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(EXTERNAL_URL, EXTERNAL_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: makeCustomFetch(EXTERNAL_URL, EXTERNAL_KEY) as typeof fetch },
  });
  return _client;
}

/** 始终返回 false，只用外部库 */
export const isInternal = false;

/** 获取当前实际使用的 Supabase URL（调试用） */
export function getActualSupabaseUrl(): string {
  return EXTERNAL_URL;
}
