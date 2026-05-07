# 知践咨询企业官网 - 项目文档

## 项目概述

知践咨询企业官网，采用现代科技感设计风格，基于Next.js 16 + React 19 + TypeScript构建。

**核心定位**：企业数智化进化的实战陪跑者

**联系方式**：
- 电话：13322459191
- 联系人：李老师
- 地址：沈阳市和平区长白街道和盛巷6甲万科中心写字间2110室

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI组件**: shadcn/ui (基于 Radix UI)
- **数据库**: Supabase (PostgreSQL) - 用户自有实例
- **AI客服**: Coze智能体

## Supabase连接配置

**重要**: 项目使用用户自有的Supabase实例。

- **用户Supabase URL**: `https://pjqtjfmjhurarcnhvxgo.supabase.co`
- **配置文件**: `src/storage/database/supabase-client.ts`
- **DNS解析**: 通过 `dns.lookup` 直接解析 + `https.request` 配合自定义Agent实现，不依赖系统DNS和hosts文件
- **双链路**: 优先外部库（DNS直连），失败时自动回退到内网库（COZE_SUPABASE_URL）
- **表名**: 外部库用 `team`，内网库用 `team_members`
- **字段名**: 外部库用 snake_case，内网库用 camelCase（API层统一转换）

### 双链路工作原理

1. 优先用外部Supabase：`https://pjqtjfmjhurarcnhvxgo.supabase.co`
   - 通过 `dns.lookup` 解析域名，手动获取IP
   - 用 `https.request` 配合 Agent 直接连接该IP
   - 保持 Host header 让Cloudflare正确路由
2. 若外部库失败（超时/网络错误），自动切换到内网库
   - 使用 `COZE_SUPABASE_URL` 环境变量（系统内网地址）
   - 直接连接，无需DNS解析

## 页面结构

### 前台页面 (8个)

| 路由 | 页面 | 描述 |
|------|------|------|
| `/` | 首页 | Hero + 数据统计 + 独创方法论 + 服务项目 + 案例展示 + 选择理由 |
| `/about` | 关于知践 | 公司介绍、团队、荣誉资质 |
| `/consulting` | 数智转型 | 6步服务流程(S型) + 4项服务Tab切换 + 核心优势 |
| `/ai` | 赋能培训 | Tab切换 + 杂志编辑式布局 + 训战路径 + 核心价值 |
| `/training` | 商业陪跑 | 垂直时间线 + 全宽沉浸式卡片 |
| `/cases` | 客户案例 | 动态分类标签 + "更多主题"下拉 |
| `/wiki` | 知践百科 | 动态分类标签 + "更多主题"下拉 |
| `/contact` | 联系我们 | 联系方式 + 地图 |
| 右下角悬浮 | 智能客服 | Coze智能体对话 |

### 后台管理 (4个)

| 路由 | 页面 | 描述 |
|------|------|------|
| `/admin` | 仪表盘 | 数据统计概览 |
| `/admin/cases` | 案例管理 | CRUD操作 |
| `/admin/articles` | 文章管理 | CRUD操作 |
| `/admin/team` | 师资管理 | CRUD操作 |
| `/admin/chat` | 客服配置 | 配置Coze智能体 |

## 组件结构

```
src/components/
├── Navbar.tsx         # 导航栏（响应式，含移动端菜单，无顶部信息栏）
├── Footer.tsx         # 页脚（联系方式 + 快速链接）
├── ChatWidget.tsx     # 智能客服悬浮组件
├── Hero.tsx           # Hero轮播区（粒子动画背景）
├── Stats.tsx          # 数据统计区（数字动画计数）
├── PainPoints.tsx     # 独创方法论区（AI工作法 + 数字员工流水线，左右布局）
├── Services.tsx       # 服务项目区（3大服务卡片：数智转型/赋能培训/商业陪跑）
├── Cases.tsx          # 案例展示区（精选案例）
└── WhyUs.tsx          # 选择理由区（4大核心优势）
```

## 数据库表 (Supabase - 用户实例)

| 表名 | 用途 |
|------|------|
| `team` | 师资团队（注意：不是team_members） |
| `cases` | 客户案例 |
| `articles` | 知识文章 |
| `chat_config` | 客服配置（需确认是否已创建） |

## 重要提醒

### ID类型
- **所有表的主键ID都是UUID格式**，不是整数
- 前端代码中必须使用 `string` 类型，不能使用 `number` 类型
- API调用时URL参数必须是完整的UUID字符串，如：`/api/cases/0e790612-c259-4962-b016-e3e2781b9db1`

### API返回格式
- 所有API返回格式统一为 `{"success": true/false, "data": [...], "error": "..."}`
- 删除和更新操作返回 `{"success": true}` 表示成功

## API接口

| 路由 | 方法 | 描述 |
|------|------|------|
| `/api/cases` | GET | 获取案例列表（支持category筛选） |
| `/api/cases` | POST | 创建案例 |
| `/api/cases/[id]` | GET | 获取案例详情 |
| `/api/cases/[id]` | PUT | 更新案例 |
| `/api/cases/[id]` | DELETE | 删除案例 |
| `/api/articles` | GET | 获取文章列表（支持category筛选） |
| `/api/articles` | POST | 创建文章 |
| `/api/articles/[id]` | GET | 获取文章详情 |
| `/api/team` | GET | 获取师资列表 |
| `/api/team` | POST | 创建师资 |
| `/api/team/[id]` | GET | 获取师资详情 |
| `/api/team/[id]` | PUT | 更新师资 |
| `/api/team/[id]` | DELETE | 删除师资 |
| `/api/chat` | POST | 智能客服对话 |
| `/api/chat-config` | GET | 获取客服配置 |
| `/api/chat-config` | POST | 保存客服配置 |
| `/api/admin/login` | POST | 后台登录 |
| `/api/admin/logout` | POST | 后台登出 |
| `/api/admin/cleanup` | GET/POST | 后台统计与清理 |
| `/api/fetch-url` | POST | URL内容获取 |
| `/api/upload` | POST | 文件上传 |

## 开发命令

```bash
# 开发环境（通过coze dev或pnpm dev启动，端口5000）
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务
pnpm start

# 代码检查
pnpm lint
pnpm ts-check
```

## 设计规范

### 视觉风格
- **主色调**: 深蓝 (#0A1628) + 科技蓝 (#00D4FF)
- **风格**: 科技现代感、毛玻璃效果、渐变动画
- **圆角**: 卡片使用 rounded-2xl / rounded-3xl

### 动画效果
- 页面滚动淡入动画 (fade-in-up)
- 卡片悬停上浮 (card-hover)
- 数字计数动画 (Counter)
- 粒子网格背景 (Hero)

### 科技感元素
- 毛玻璃效果: `glass` / `glass-strong` class
- 渐变按钮: `btn-gradient` class
- 发光边框: `tech-border` class
- 网格背景: `grid-bg` class

## 关键注意事项

1. **Supabase连接策略（重要）**: 优先连接用户外部Supabase（pjqtjfmjhurarcnhvxgo.supabase.co），
   通过DNS劫持绕过域名解析；失败则回退到系统内网库（COZE_SUPABASE_URL）。
   两个库的表结构和数据可能不同。
2. **外部Supabase DNS劫持**: Node.js 24的undici不走dns.lookup，需在fetch前用dns.resolve4
   手动解析+直接连接IP（104.18.38.10），不能用https.Agent.lookup。
3. **表名**: 
   - 外部库：team / cases / articles / chat_config
   - 内网库：team_members / cases / articles / chat_config
   代码通过TEAM_TABLE常量动态切换。
4. **字段命名**: 
   - 外部库：image_url1, cover_image, is_published (snake_case)
   - 内网库：imageUrl1, coverImage, isPublished (camelCase)
   API层有双向映射函数（mapFieldsToSnake, mapFieldsToCamel）。
5. **三个服务页面风格不同**: 数智转型(S型流程+Tab)、赋能培训(杂志编辑式)、商业陪跑(时间线)
6. **首页方法论板块**: 左侧图片+右侧文案，不是痛点展开式
7. **导航栏**: 无顶部信息栏，直接是主导航
