import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

// ============================================================
// 启动 Next.js 服务
// 
// Supabase DNS 解析已移至 supabase-client.ts 的 customFetch，
// 通过 https.Agent 的 lookup 参数实现，不再依赖 dns.lookup 劫持。
// 原因：Node.js 24 的 fetch 底层用 undici，不走 dns.lookup，
// 所以 dns.lookup 劫持对 Supabase 请求无效。
// ============================================================

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || process.env.DEPLOY_RUN_PORT || '5000', 10);

console.log(`> Starting server: NODE_ENV=${process.env.NODE_ENV}, port=${port}`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
