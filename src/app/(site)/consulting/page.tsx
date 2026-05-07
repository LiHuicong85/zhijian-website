"use client";

import Link from "next/link";
import { 
  Server, UserCog, Brain, BarChart3,
  Search, FileText, Users, LineChart, RefreshCw,
  Shield, CheckCircle, ArrowRight, Target,
  ChevronRight, ChevronLeft, Cpu, Database, Workflow, BarChart2,
  ArrowDown, Lock, Rocket, RotateCcw, Phone
} from "lucide-react";

const services = [
  {
    id: "deploy",
    icon: Server,
    title: "AI私有部署",
    subtitle: "安全隔离 · 合规使用",
    keyword: "AI Private Deployment",
    color: "cyan",
    features: [
      { icon: Cpu, text: "主流大模型本地化部署" },
      { icon: Database, text: "私有数据微调与治理" },
      { icon: Workflow, text: "与ERP/CRM/OA深度集成" },
      { icon: Shield, text: "各种垂类模型训练及微调" },
    ],
    description: "基于企业内网环境，提供主流大模型的本地化部署、私有数据微调及与现有业务系统（ERP/CRM/OA）的深度集成服务，确保核心数据资产安全隔离与合规使用。支持多种主流大模型选型适配，根据企业实际算力条件与业务需求，灵活规划部署方案，让AI能力真正在企业内部安全运行。",
    value: "让AI住在企业自己家，数据不离开企业内网，核心业务数据安全可控，满足行业合规要求，同时享受AI带来的效率提升",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "workflow",
    icon: UserCog,
    title: "岗位AI改造",
    subtitle: "人机协同 · 效能倍增",
    keyword: "AI-Powered Job Transformation",
    color: "emerald",
    features: [
      { icon: Search, text: "核心岗位SOP数字化拆解" },
      { icon: UserCog, text: "定制AI数字员工" },
      { icon: Workflow, text: "自动化工作流部署" },
      { icon: CheckCircle, text: "人机协同作业标准化" },
    ],
    description: "针对核心业务岗位进行SOP数字化拆解，定制部署AI数字员工与自动化工作流，实现重复性任务的智能替代与人机协同作业标准化。从岗位任务分析入手，识别可自动化环节，逐步将重复性、规则性工作交由AI处理，释放人力聚焦高价值判断与创造性工作。",
    value: "把重复性工作交给AI，让人专注于更有价值的决策和创造性工作，岗位效率提升3-10倍，人为差错率大幅降低",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "brain",
    icon: Brain,
    title: "企业AI大脑",
    subtitle: "知识中枢 · 智能问答",
    keyword: "Enterprise AI Brain",
    color: "violet",
    features: [
      { icon: Database, text: "多源异构数据智能解析" },
      { icon: Brain, text: "向量化存储与语义检索" },
      { icon: Search, text: "可对话的业务专家系统" },
      { icon: RefreshCw, text: "持续学习迭代升级" },
    ],
    description: "基于RAG与大模型技术构建企业级知识中枢，实现多源异构数据的智能解析、向量化存储与语义检索，打造可对话、可推理、可迭代的业务专家系统。将企业沉淀的制度文档、项目经验、行业知识等全部结构化入库，让每一位员工都能像咨询专家一样获取即时、精准的答案。",
    value: "企业知识一问即答，新员工也能像老专家一样工作，知识不再流失，经验持续积累，越用越聪明",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "decision",
    icon: BarChart3,
    title: "AI决策看板",
    subtitle: "数据驱动 · 事前预警",
    keyword: "AI Decision Dashboard",
    color: "orange",
    features: [
      { icon: BarChart2, text: "打通企业内部数据孤岛" },
      { icon: LineChart, text: "动态经营指标可视化" },
      { icon: BarChart3, text: "业务推演与沙盘模拟" },
      { icon: Target, text: "从事后统计到事前预警" },
    ],
    description: "打通企业内部数据孤岛，融合AI预测算法与可视化BI技术，构建动态经营指标看板与业务推演沙盘，实现从事后统计向事前预警的管理跃迁。让管理层随时掌握经营全局，通过AI驱动的趋势预测与异常预警，在问题发生前及时干预，真正实现数据驱动决策。",
    value: "提前预判经营风险，从被动救火到主动预防，决策有数据支撑，不靠拍脑袋，让每一项经营决策都有依据",
    gradient: "from-orange-500 to-amber-600",
  },
];

const processSteps = [
  { num: "01", title: "业务扫描", icon: Search, desc: "深度调研企业现状与痛点，识别转型机会点" },
  { num: "02", title: "方案设计", icon: FileText, desc: "定制专属数智转型路线图与实施策略" },
  { num: "03", title: "流程再造", icon: Workflow, desc: "优化核心业务流程，嵌入AI能力节点" },
  { num: "04", title: "人员培训", icon: Users, desc: "赋能团队AI应用能力，确保落地效果" },
  { num: "05", title: "效果评估", icon: LineChart, desc: "量化验证转型成果，对齐业务目标" },
  { num: "06", title: "持续迭代", icon: RefreshCw, desc: "基于数据反馈持续优化，驱动长期增长" },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30" },
  violet: { bg: "bg-violet-500", text: "text-violet-400", border: "border-violet-500/30" },
  orange: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30" },
};

export default function ConsultingPage() {
  // 第一行: 1→2→3, 第二行: 6→5→4
  const topRow = processSteps.slice(0, 3);
  const bottomRow = [processSteps[5], processSteps[4], processSteps[3]];

  return (
    <div className="pt-24 page-enter">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass tech-border mb-6">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80">从0到1 · 让AI真正落地企业</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">数智转型</span>
              <br />
              让每一分投入都转化为业务增长
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              四大数智服务方案，覆盖部署、改造、知识、决策全链路
              <br />
              数据安全+快速落地+持续迭代
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-cta font-semibold text-lg btn-press"
            >
              预约转型方案
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 服务流程 - S型排列 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              六步
              <span className="gradient-text">服务流程</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              陪伴式交付，确保每一步都可量化、可验证
            </p>
          </div>

          {/* 第一行: 1→2→3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRow.map((step, index) => (
              <div key={step.num} className="relative group">
                <div className="p-6 rounded-2xl glass border border-white/10 card-hover h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20">
                        <step.icon className="w-7 h-7 text-cyan-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-xs font-bold text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded mb-2">STEP {step.num}</span>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
                {/* 向右箭头 */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-cyan-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右侧向下箭头 - 在3和4之间 */}
          <div className="hidden md:flex justify-end my-4 pr-[16.67%]">
            <ArrowDown className="w-8 h-8 text-cyan-400/60" />
          </div>
          {/* 移动端居中箭头 */}
          <div className="flex md:hidden justify-center my-4">
            <ArrowDown className="w-8 h-8 text-cyan-400/60" />
          </div>

          {/* 第二行: 6→5→4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomRow.map((step, index) => (
              <div key={step.num} className="relative group">
                <div className="p-6 rounded-2xl glass border border-white/10 card-hover h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20">
                        <step.icon className="w-7 h-7 text-cyan-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-xs font-bold text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded mb-2">STEP {step.num}</span>
                      <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
                {/* 向左箭头（6←5←4方向） */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronLeft className="w-6 h-6 text-cyan-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四大服务 - 左右对联布局 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              四大
              <span className="gradient-text">数智服务</span>
              方案
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              针对企业数智化不同阶段需求，提供定制化解决方案
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
              >
                {/* 内容侧 */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-sm mb-5`}>
                    <service.icon className="w-4 h-4" />
                    {service.keyword}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className={`text-lg ${colorMap[service.color].text} font-medium mb-5`}>
                    {service.subtitle}
                  </p>
                  <p className="text-white/60 leading-relaxed mb-6 text-base">
                    {service.description}
                  </p>

                  {/* 核心价值 */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className={`w-5 h-5 ${colorMap[service.color].text}`} />
                      <span className="text-white font-semibold">核心价值</span>
                    </div>
                    <p className={`text-base leading-relaxed ${colorMap[service.color].text}`}>{service.value}</p>
                  </div>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 ${colorMap[service.color].text} hover:text-white transition-colors group font-medium`}
                  >
                    获取方案
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* 视觉侧 */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.gradient} bg-opacity-5 border ${colorMap[service.color].border}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
                    <div className="relative">
                      <div className="flex items-center justify-center mb-8">
                        <div className={`w-24 h-24 rounded-3xl ${colorMap[service.color].bg} flex items-center justify-center shadow-lg`}>
                          <service.icon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <h4 className="text-center text-white font-bold text-xl mb-4">{service.title}</h4>
                      <div className="space-y-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                            <feature.icon className={`w-5 h-5 ${colorMap[service.color].text} flex-shrink-0`} />
                            <span className="text-white/80 text-sm">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-800/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              数智转型
              <span className="gradient-text">核心优势</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: "安全可控", desc: "数据本地化运行，核心资产不出域，满足合规与安全双重保障" },
              { icon: Rocket, title: "快速见效", desc: "标准化交付流程，从诊断到首场景上线，最快30天落地" },
              { icon: Target, title: "量身定制", desc: "深入业务调研诊断，拒绝通用模板，只做最适合的方案" },
              { icon: RotateCcw, title: "长期陪跑", desc: "持续跟踪效果，基于业务变化不断优化迭代，陪伴企业成长" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl glass border border-white/5">
                <div className={`w-14 h-14 rounded-full ${colorMap[['cyan', 'emerald', 'violet', 'orange'][index]].bg} bg-opacity-20 flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-7 h-7 ${colorMap[['cyan', 'emerald', 'violet', 'orange'][index]].text}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - 简洁转化 */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="relative p-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-violet-500/10 rounded-3xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  开启企业
                  <span className="gradient-text">数智转型</span>
                  之旅
                </h2>
                <p className="text-white/60">专业团队全程陪跑，从诊断到落地一站式服务</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-cta font-semibold whitespace-nowrap btn-press"
                >
                  获取方案
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="tel:13322459191"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  13322459191
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
