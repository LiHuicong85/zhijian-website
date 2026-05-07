"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Building2 } from "lucide-react";

interface CaseData {
  id: string;
  title: string;
  company: string;
  category: string;
  description: string;
  content_cases: string;
  project_achievements_cases: string;
  image_url1: string | null;
  image_url2: string | null;
  is_published: boolean;
  created_at: string;
}

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/cases/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setCaseData(Array.isArray(data.data) ? data.data[0] : data.data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center">
        <p className="text-gray-400 text-lg mb-6">未找到该案例</p>
        <button
          onClick={() => router.push("/cases")}
          className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors"
        >
          返回案例列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Hero区 */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回案例列表
          </Link>

          {/* 分类标签 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
            <Building2 className="w-4 h-4" />
            {caseData.category}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl">
            {caseData.title}
          </h1>

          {caseData.company && (
            <p className="text-xl text-gray-400 mb-4">
              客户：{caseData.company}
            </p>
          )}

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            {new Date(caseData.created_at).toLocaleDateString("zh-CN")}
          </div>
        </div>
      </section>

      {/* 案例图片 */}
      {caseData.image_url1 && (
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={caseData.image_url1}
                alt={caseData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* 项目概述 */}
      {caseData.description && (
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full"></span>
              项目概述
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {caseData.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 项目详情 */}
      {caseData.content_cases && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full"></span>
              咨询详情
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10">
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                  {caseData.content_cases}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 项目成果 */}
      {caseData.project_achievements_cases && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full"></span>
              项目成果
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                {caseData.project_achievements_cases}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 案例图片2 */}
      {caseData.image_url2 && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={caseData.image_url2}
                alt={caseData.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">想要实现同样的效果？</h3>
          <p className="text-gray-400 mb-6">联系我们，获取专属解决方案</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            获取方案
          </Link>
        </div>
      </section>
    </div>
  );
}
