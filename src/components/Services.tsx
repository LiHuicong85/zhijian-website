"use client";

import Link from "next/link";
import { Brain, Rocket, BookOpen, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "数智转型",
    subtitle: "AI驱动进化",
    description: "AI私有部署 | 岗位AI改造 | 企业AI大脑 | AI决策看板",
    href: "/consulting",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Rocket,
    title: "赋能培训",
    subtitle: "能力全面升级",
    description: "AI场景实训 | AI专题赋能 | AI工具实战 | AI资格认证",
    href: "/ai",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: BookOpen,
    title: "商业陪跑",
    subtitle: "并肩作战拿结果",
    description: "AI商业创新 | AI营销增长 | AI梯队建设 | AI用工风控",
    href: "/training",
    gradient: "from-violet-500 to-purple-500",
  },
];

export function Services() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 via-slate-900 to-slate-900" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* 装饰元素 */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            三大核心
            <span className="gradient-text">服务领域</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            专注企业管理与数智化转型，提供全方位、一体化的解决方案
          </p>
        </div>

        {/* 服务卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative p-8 rounded-3xl glass card-hover overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 背景渐变 */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* 图标 */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* 内容 */}
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm mb-4">{service.subtitle}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* 箭头 */}
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                了解更多
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
