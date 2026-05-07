"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Award, Building2 } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 12,
    suffix: "+",
    label: "深耕年份",
    description: "12年专注于企业咨询与培训",
  },
  {
    icon: Users,
    value: 2000,
    suffix: "+",
    label: "服务客户",
    description: "成功服务超过2000家企业",
  },
  {
    icon: Award,
    value: 500,
    suffix: "+",
    label: "定制方案",
    description: "500+个性化解决方案",
  },
  {
    icon: Building2,
    value: 360,
    suffix: "°",
    label: "贴心服务",
    description: "全方位贴身服务支持",
  },
];

function Counter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        countRef.current = current;
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  return (
    <span className="number-animate">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* 装饰光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            用数据<span className="gradient-text">见证实力</span>
          </h2>
          <p className={`text-white/60 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            12年来，我们深耕企业咨询与培训领域，以专业能力和实战经验赢得客户信赖
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative p-8 rounded-3xl glass card-hover cursor-default ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* 图标 */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7 text-cyan-400" />
              </div>

              {/* 数字 */}
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>

              {/* 标签 */}
              <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
              
              {/* 描述 */}
              <p className="text-white/50 text-sm">{stat.description}</p>

              {/* 悬停边框 */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-400/30 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
