"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Zap, Shield, Heart } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "实战导向",
    description: "拒绝空谈概念与工具堆砌，直击转型核心痛点，确保方案可落地执行。",
    stat: "100%",
    statLabel: "方案落地率",
  },
  {
    icon: Zap,
    title: "高效响应",
    description: "360°贴身服务，快速响应企业需求，提供全程专业支持与指导。",
    stat: "24h",
    statLabel: "快速响应",
  },
  {
    icon: Shield,
    title: "专业可靠",
    description: "12年深耕经验，50+合伙人团队，为企业提供专业可靠的管理咨询服务。",
    stat: "50+",
    statLabel: "合伙人团队",
  },
  {
    icon: Heart,
    title: "持续陪伴",
    description: "不仅是咨询公司，更是懂业务、能落地、可沉淀的长期战略伙伴。",
    stat: "2000+",
    statLabel: "企业信赖",
  },
];

export function WhyUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/50" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* 装饰 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[200px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            选择知践的
            <span className="gradient-text">四大理由</span>
          </h2>
          <p className={`text-white/60 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            &ldquo;只有知践，才有知见&rdquo; —— 这是我们的核心理念，也是我们对客户的承诺
          </p>
        </div>

        {/* 理由卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`relative text-center p-8 rounded-3xl glass card-hover cursor-default ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* 图标 */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-full glass tech-border flex items-center justify-center">
                  <reason.icon className="w-10 h-10 text-cyan-400" />
                </div>
                {/* 呼吸光环 */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse" />
              </div>

              {/* 标题 */}
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>

              {/* 描述 */}
              <p className="text-white/60 text-sm leading-relaxed mb-4 px-4">
                {reason.description}
              </p>

              {/* 数据 */}
              <div className="inline-flex flex-col items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10">
                <span className="text-2xl font-bold gradient-text">{reason.stat}</span>
                <span className="text-xs text-white/50">{reason.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slogan */}
        <div className={`mt-20 text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
          <div className="inline-block px-12 py-6 rounded-3xl glass tech-border">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              知践咨询
            </p>
            <p className="text-lg text-cyan-400">
              数智化时代企业增长的实战陪跑者
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
