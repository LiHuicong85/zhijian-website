import { NextResponse } from 'next/server';

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>删除功能测试</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0A1628; color: #fff; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #00D4FF; margin-bottom: 20px; }
    .test-section { background: #1a2744; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .test-section h2 { font-size: 16px; margin-bottom: 12px; color: #00D4FF; }
    button { background: #00D4FF; color: #000; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-right: 8px; margin-bottom: 8px; }
    button:hover { background: #00b8e6; }
    button.delete { background: #dc2626; color: #fff; }
    button.delete:hover { background: #b91c1c; }
    pre { background: #0A1628; padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 12px; margin-top: 12px; max-height: 200px; overflow-y: auto; }
    .result { margin-top: 12px; }
    .success { color: #22c55e; }
    .error { color: #ef4444; }
    .case-item { background: #0A1628; padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
    .case-info { flex: 1; }
    .case-title { font-weight: bold; margin-bottom: 4px; }
    .case-company { color: #00D4FF; font-size: 12px; }
    .case-detail { color: #888; font-size: 11px; margin-top: 4px; }
    input, textarea { width: 100%; padding: 10px; background: #0A1628; border: 1px solid #333; border-radius: 8px; color: #fff; margin-bottom: 12px; font-family: inherit; }
    textarea { min-height: 80px; resize: vertical; }
    label { display: block; margin-bottom: 6px; color: #aaa; }
  </style>
</head>
<body>
  <div class="container">
    <h1>API功能测试页面</h1>
    
    <div class="test-section">
      <h2>1. 获取案例列表</h2>
      <button onclick="loadCases()">加载案例</button>
      <div id="cases-list"></div>
    </div>

    <div class="test-section">
      <h2>2. 新增案例 (包含项目详情和项目成果)</h2>
      <label>标题</label>
      <input type="text" id="new-title" value="测试案例-最终验证">
      <label>公司名称</label>
      <input type="text" id="new-company" value="测试公司ABC">
      <label>行业分类</label>
      <input type="text" id="new-category" value="制造业">
      <label>简介描述</label>
      <input type="text" id="new-description" value="这是一个测试案例">
      <label>项目详情 (content_cases)</label>
      <textarea id="new-content-cases">【项目详情内容】这是详细的项目描述，包括实施步骤、方法和过程。</textarea>
      <label>项目成果 (project_achievements_cases)</label>
      <textarea id="new-project-achievements">【项目成果内容】这是取得的成效，包括效率提升30%、成本降低20%等关键数据。</textarea>
      <button onclick="createCase()">新增案例</button>
    </div>

    <div class="test-section">
      <h2>3. 操作日志</h2>
      <pre id="result"></pre>
    </div>
  </div>

  <script>
    let cases = [];

    async function log(message, isError = false) {
      const result = document.getElementById('result');
      const time = new Date().toLocaleTimeString();
      const className = isError ? 'error' : 'success';
      result.innerHTML += '<span class="' + className + '">[' + time + '] ' + message + '</span>\\n';
      result.scrollTop = result.scrollHeight;
    }

    async function loadCases() {
      try {
        log('正在加载案例...');
        const res = await fetch('/api/cases');
        const data = await res.json();
        if (data.success) {
          cases = data.data;
          log('加载成功，共 ' + cases.length + ' 条案例');
          renderCases();
        } else {
          log('加载失败: ' + JSON.stringify(data.error), true);
        }
      } catch (e) {
        log('加载失败: ' + e.message, true);
      }
    }

    function renderCases() {
      const container = document.getElementById('cases-list');
      if (cases.length === 0) {
        container.innerHTML = '<p style="color:#888">暂无案例</p>';
        return;
      }
      container.innerHTML = cases.map(function(c) {
        return '<div class="case-item">' +
          '<div class="case-info">' +
            '<div class="case-title">' + c.title + '</div>' +
            '<div class="case-company">' + c.company + ' - ' + c.category + '</div>' +
            '<div class="case-detail">详情: ' + (c.content_cases || '(空)') + '</div>' +
            '<div class="case-detail">成果: ' + (c.project_achievements_cases || '(空)') + '</div>' +
          '</div>' +
          '<div>' +
            '<button class="delete" onclick="deleteCase(\\'' + c.id + '\\')">删除</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function createCase() {
      const data = {
        title: document.getElementById('new-title').value,
        company: document.getElementById('new-company').value,
        category: document.getElementById('new-category').value,
        description: document.getElementById('new-description').value,
        content_cases: document.getElementById('new-content-cases').value,
        project_achievements_cases: document.getElementById('new-project-achievements').value
      };
      
      try {
        log('正在创建案例...');
        const res = await fetch('/api/cases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          log('创建成功！');
          await loadCases();
        } else {
          log('创建失败: ' + JSON.stringify(result.error), true);
        }
      } catch (e) {
        log('创建失败: ' + e.message, true);
      }
    }

    async function deleteCase(id) {
      if (!confirm('确定要删除这个案例吗？')) return;
      
      try {
        log('正在删除案例...');
        const res = await fetch('/api/cases/' + id, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
          log('删除成功！');
          await loadCases();
        } else {
          log('删除失败: ' + JSON.stringify(result.error), true);
        }
      } catch (e) {
        log('删除失败: ' + e.message, true);
      }
    }

    // 初始加载
    loadCases();
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
