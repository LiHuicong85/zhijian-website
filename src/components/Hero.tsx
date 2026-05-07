"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // 粒子动画
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.5)";
        ctx.fill();
      });

      // 绘制连接线
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - dist / 750})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* 网格背景 */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        
        {/* 渐变光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
        
        {/* 粒子画布 */}
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
        <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass tech-border">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80">企业数智化增长架构师</span>
          </div>

          {/* 标题 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">知践咨询</span>
            <br />
            <span className="gradient-text">数智化时代企业增长的</span>
            <br />
            <span className="text-white">实战陪跑者</span>
          </h1>

          {/* 核心特点标签 */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {["懂商业", "懂组织", "懂增长", "懂AI", "更懂落地"].map((tag, i) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  i === 4
                    ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                    : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-cyan-400/30"
                }`}
              >
                {i < 4 && <span className="w-1 h-1 rounded-full bg-cyan-400/60" />}
                {i === 4 && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                {tag}
              </span>
            ))}
          </div>

          {/* 副标题 */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed">
            我们始终坚信&ldquo;只有知践，才有知见&rdquo;。在 AI 重塑商业逻辑的今天，
            <br className="hidden md:block" />
            企业真正稀缺的不是工具，而是将技术转化为核心生产力的系统能力。
          </p>

          {/* 数字统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            {[
              { value: "12+", label: "深耕年份" },
              { value: "2000+", label: "服务客户" },
              { value: "500+", label: "定制方案" },
              { value: "360°", label: "贴心服务" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="text-3xl md:text-5xl font-bold gradient-text">{stat.value}</div>
                <div className="text-white/60 text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs">滚动探索</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
