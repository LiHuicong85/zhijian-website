"use client";

import { useState } from "react";
import Image from "next/image";

const methodologies = [
  {
    id: "ai-work",
    title: "AI场景化工作法",
    tag: "独创方法论",
    image: "/ai-work-method.png",
    color: "from-orange-500 to-amber-400",
    colorHex: "#f97316",
    painDesc:
      "企业引入AI不知从何入手，试点项目效果难复制，投入产出不成正比，AI应用停留在试玩阶段无法真正融入业务。",
    solutionDesc:
      "知践咨询独创的AI落地闭环方法论。以「场景驱动」锚定真实需求，以「任务导向」确保落地可行，通过定义任务→验证优化→填充打磨→规模复用→自动化增强5步循环推进，让员工快速驾驭AI使用方法，提升岗位工作效率。",
    tags: ["场景驱动", "任务导向", "5步闭环", "快速上手"],
  },
  {
    id: "digital-employee",
    title: "数字员工流水线",
    tag: "独创方法论",
    image: "/digital-employee.png",
    color: "from-cyan-500 to-blue-400",
    colorHex: "#06b6d4",
    painDesc:
      "数字员工建而不用、用而不精，缺乏体系化建设思路，人机分工不清晰，重复性工作仍大量依赖人工，效率提升不明显。",
    solutionDesc:
      "知践咨询独创的数字员工全生命周期管理体系。通过二维八步法，打通「企项一体」纵向协同与「人机协同」横向融合，实现提效、降本、提质、创新四大目标。",
    tags: ["企项一体", "人机协同", "数字员工精益化", "全生命周期"],
  },
];

export function PainPoints() {
  const [activeMethod, setActiveMethod] = useState("ai-work");

  const current = methodologies.find((m) => m.id === activeMethod)!;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/50" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            独创方法论
            <span className="gradient-text">实战工具</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            沉淀多年实战经验，打造可复制的AI落地方法论体系
          </p>
        </div>

        {/* 方法论切换 */}
        <div className="flex justify-center gap-4 mb-12">
          {methodologies.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMethod(m.id)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                activeMethod === m.id
                  ? `bg-gradient-to-r ${m.color} text-slate-900 shadow-lg`
                  : "glass text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        {/* 左右布局：图片左 + 内容右 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：方法论图片 - 凸显展示 */}
          <div className="relative">
            {/* 外层发光 */}
            <div
              className="absolute -inset-1.5 rounded-3xl opacity-30 blur-md"
              style={{
                background: `linear-gradient(135deg, ${current.colorHex}, ${current.colorHex}44)`,
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-2xl">
              {/* 顶部渐变装饰条 */}
              <div className={`h-1 bg-gradient-to-r ${current.color}`} />
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${current.color} text-slate-900`}
                  >
                    {current.tag}
                  </span>
                  <span className="text-white/60 text-sm font-medium">
                    {current.title}
                  </span>
                </div>
                <Image
                  src={current.image}
                  alt={current.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 右侧：痛点+解法 合一卡片 */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-8">
              {/* 企业面临问题 */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-red-500/15 text-red-400 mb-3">
                  面临的问题
                </span>
                <p className="text-white/80 leading-relaxed text-[15px]">
                  {current.painDesc}
                </p>
              </div>

              {/* 分隔线 */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />

              {/* 独创方法论 */}
              <div className="mb-5">
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                  style={{
                    backgroundColor: current.colorHex + "18",
                    color: current.colorHex,
                  }}
                >
                  独创方法论
                </span>
                <p className="text-white/80 leading-relaxed text-[15px]">
                  {current.solutionDesc}
                </p>
              </div>

              {/* 核心标签 */}
              <div className="flex flex-wrap gap-2">
                {current.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 rounded-full text-sm font-medium border"
                    style={{
                      color: current.colorHex,
                      borderColor: current.colorHex + "30",
                      backgroundColor: current.colorHex + "10",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
