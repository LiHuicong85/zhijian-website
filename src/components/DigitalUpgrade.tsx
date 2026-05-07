"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Route,
  Lightbulb,
} from "lucide-react";

const columns = [
  {
    icon: TrendingDown,
    title: "降本增效",
    subtitle: "成本更可控",
    items: ["流程更智能", "成本更可控", "效率大幅提升"],
    gradient: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-400/20",
    iconColor: "text-cyan-400",
    dotColor: "bg-cyan-400",
    glowColor: "shadow-cyan-500/10",
  },
  {
    icon: TrendingUp,
    title: "快速增长",
    subtitle: "找客户真需求",
    items: ["精准洞察需求", "业绩持续倍增", "优化增长路径"],
    gradient: "from-teal-500/20 to-teal-500/5",
    borderColor: "border-teal-400/20",
    iconColor: "text-teal-400",
    dotColor: "bg-teal-400",
    glowColor: "shadow-teal-500/10",
  },
  {
    icon: Route,
    title: "突破增长路径",
    subtitle: "扫描业务盲区",
    items: ["发现新机会", "构建新模式", "创造新价值"],
    gradient: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-400/20",
    iconColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    glowColor: "shadow-emerald-500/10",
  },
  {
    icon: Lightbulb,
    title: "全新商业模式",
    subtitle: "让商业不再卷",
    items: ["突破传统思维", "打造第二增长曲线", "找到新的商业模式"],
    gradient: "from-sky-500/20 to-sky-500/5",
    borderColor: "border-sky-400/20",
    iconColor: "text-sky-400",
    dotColor: "bg-sky-400",
    glowColor: "shadow-sky-500/10",
  },
];

export function DigitalUpgrade() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* 标题区 */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">数智化升级后，帮企业</span>
              <span className="gradient-text">实现</span>
            </h2>
            <div className="w-20 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
          </div>
        </div>

        {/* 四列内容 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {columns.map((col, colIndex) => (
            <div
              key={col.title}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(colIndex + 1) * 120}ms` }}
            >
              <div
                className={`relative h-full p-6 md:p-8 rounded-2xl bg-gradient-to-b ${col.gradient} ${col.borderColor} border backdrop-blur-sm transition-all duration-400 hover:-translate-y-2 hover:shadow-xl ${col.glowColor}`}
              >
                {/* 顶部图标 */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border ${col.borderColor} mb-5`}>
                  <col.icon className={`w-6 h-6 ${col.iconColor}`} />
                </div>

                {/* 标题 */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {col.title}
                </h3>
                <p className={`text-sm ${col.iconColor} mb-5 font-medium`}>
                  {col.subtitle}
                </p>

                {/* 条目列表 */}
                <ul className="space-y-3">
                  {col.items.map((item, itemIndex) => (
                    <li
                      key={`${colIndex}-${itemIndex}`}
                      className="flex items-center gap-2.5 text-white/70 text-sm"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${col.dotColor} flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* 底部装饰线 */}
                <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
