# 知践咨询企业官网 - 内容维护指南

## 目录
1. [后台登录](#1-后台登录)
2. [内容维护文件位置](#2-内容维护文件位置)
3. [页面内容修改](#3-页面内容修改)
4. [后台管理功能](#4-后台管理功能)
5. [联系方式修改](#5-联系方式修改)

---

## 1. 后台登录

### 登录地址
```
https://zhijian.cn/admin/login
```

### 默认账号
- 用户名：`admin`
- 密码：`zhijian2024`

> ⚠️ **重要提示**：首次登录后请立即修改密码！

### 登录后访问
- 仪表盘：`/admin`
- 案例管理：`/admin/cases`
- 文章管理：`/admin/articles`
- 客服配置：`/admin/chat`

---

## 2. 内容维护文件位置

所有页面内容都在 `src/app/` 目录下，使用 Next.js App Router 结构。

### 前台页面

| 页面 | 文件路径 | 说明 |
|------|----------|------|
| 首页 | `src/app/page.tsx` | 引用组件组合 |
| 关于知践 | `src/app/about/page.tsx` | 公司介绍 |
| AI赋能 | `src/app/ai/page.tsx` | AI产品介绍 |
| 咨询服务 | `src/app/consulting/page.tsx` | 咨询业务 |
| 内训服务 | `src/app/training/page.tsx` | 培训课程 |
| 沙盘模拟 | `src/app/simulation/page.tsx` | 沙盘产品 |
| 客户案例 | `src/app/cases/page.tsx` | 案例展示 |
| 知践百科 | `src/app/wiki/page.tsx` | 文章列表 |
| 文章详情 | `src/app/wiki/[id]/page.tsx` | 文章内容 |
| 联系我们 | `src/app/contact/page.tsx` | 联系方式 |

### 公共组件

| 组件 | 文件路径 | 说明 |
|------|----------|------|
| 导航栏 | `src/components/Navbar.tsx` | 顶部导航菜单 |
| 页脚 | `src/components/Footer.tsx` | 底部信息 |
| 智能客服 | `src/components/ChatWidget.tsx` | 右下角悬浮客服 |

---

## 3. 页面内容修改

### 3.1 首页组件 (src/app/page.tsx)

首页由多个组件组合而成：
```tsx
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { PainPoints } from "@/components/PainPoints";
import { Services } from "@/components/Services";
import { Cases } from "@/components/Cases";
import { WhyUs } from "@/components/WhyUs";
```

修改对应组件文件即可更新首页内容。

### 3.2 数据统计区 (src/components/Stats.tsx)

修改 `stats` 数组中的数据：
```typescript
const stats = [
  { label: "企业客户", value: 2000, suffix: "+", description: "服务企业客户数量", icon: Building2 },
  { label: "服务时长", value: 12, suffix: "年", description: "深耕企业咨询领域", icon: Clock },
  // ... 更多数据
];
```

### 3.3 客户案例 (src/app/cases/page.tsx)

修改 `cases` 数组中的案例数据：
```typescript
const cases = [
  {
    id: 1,
    title: "案例标题",
    company: "公司名称",
    category: "行业分类",
    description: "案例描述",
    // ...
  },
];
```

### 3.4 知践百科文章 (src/app/wiki/[id]/page.tsx)

修改 `articles` 对象中的文章内容：
```typescript
const articles = {
  1: {
    id: 1,
    title: "文章标题",
    category: "分类",
    author: "作者",
    content: "文章正文内容",
    // ...
  },
};
```

### 3.5 咨询服务 (src/app/consulting/page.tsx)

修改 `serviceAreas` 数组：
```typescript
const serviceAreas = [
  {
    title: "组织管理咨询",
    problems: ["问题1", "问题2"],
    solutions: ["方案1", "方案2"],
  },
];
```

### 3.6 内训服务 (src/app/training/page.tsx)

修改 `trainingPrograms` 和 `aiTrainingPrograms` 数组。

### 3.7 AI赋能 (src/app/ai/page.tsx)

修改AI产品相关数据。

### 3.8 沙盘模拟 (src/app/simulation/page.tsx)

修改沙盘产品数据。

---

## 4. 后台管理功能

### 4.1 仪表盘 (/admin)

显示网站统计信息：
- 留言总数
- 案例数量
- 文章数量

### 4.2 案例管理 (/admin/cases)

（功能开发中）
- 查看案例列表
- 编辑案例信息

### 4.3 文章管理 (/admin/articles)

（功能开发中）
- 查看文章列表
- 编辑文章内容

### 4.4 客服配置 (/admin/chat)

配置智能客服机器人：
- Coze Bot ID
- API Token

---

## 5. 联系方式修改

### 5.1 页脚 (src/components/Footer.tsx)

```typescript
// 电话
content: "13322459191"

// 联系人
subContent: "联系人：李老师"

// 地址
content: "沈阳市和平区长白街道和盛巷6甲万科中心写字间2110室"

// 工作时间
content: "周一至周五 9:00-17:00"
```

### 5.2 联系我们页面 (src/app/contact/page.tsx)

修改 `contactInfo` 数组中的联系信息。

### 5.3 导航栏 (src/components/Navbar.tsx)

修改 `navItems` 数组中的菜单项。

---

## 6. 快速参考

### 修改文字内容
1. 找到对应的页面文件
2. 搜索需要修改的文字
3. 直接修改引号内的内容

### 修改图片
- 将新图片放入 `public/` 目录
- 修改代码中的图片引用路径

### 添加新页面
1. 在 `src/app/` 下创建新文件夹
2. 创建 `page.tsx` 文件
3. 在 `src/components/Navbar.tsx` 中添加菜单项

### 常用图标 (lucide-react)
```typescript
import { Phone, Mail, MapPin, Clock, Users, Briefcase, BookOpen, etc } from "lucide-react";
```

---

## 7. 技术栈

- **框架**：Next.js 16 (App Router)
- **UI库**：shadcn/ui + Tailwind CSS
- **图标**：lucide-react
- **动画**：Tailwind CSS 动画类

---

## 8. 联系方式

如有问题，请联系技术支持。
