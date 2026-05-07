"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Bookmark, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string;
  gradient: string;
  cover_image: string;
  created_at: string;
}

export default function ArticlePage() {
  const params = useParams();
  const articleId = params?.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [articleId]);

  const fetchArticle = async (id: string) => {
    try {
      setLoading(true);
      // 获取文章详情
      const res = await fetch(`/api/articles/${id}`);
      const result = await res.json();
      
      if (result.success && result.data) {
        const articleData = Array.isArray(result.data) ? result.data[0] : result.data;
        setArticle(articleData);
        
        // 获取相关文章（同一分类的其他文章）
        const listRes = await fetch("/api/articles");
        const listResult = await listRes.json();
        if (listResult.success) {
          const related = listResult.data
            .filter((a: Article) => a.id !== id && a.category === articleData.category)
            .slice(0, 3);
          setRelatedArticles(related);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("加载文章失败:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // 格式化日期
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 计算阅读时间
  const calcReadTime = (content: string) => {
    if (!content) return "1";
    const words = content.length;
    const minutes = Math.ceil(words / 500);
    return `${minutes}`;
  };

  // 解析标签
  const parseTags = (tagsStr: string): string[] => {
    if (!tagsStr) return [];
    try {
      return JSON.parse(tagsStr);
    } catch {
      return tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">文章不存在</h1>
          <Link
            href="/wiki"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            返回知践百科
          </Link>
        </div>
      </div>
    );
  }

  const tags = parseTags(article.tags);
  const gradient = article.gradient || "from-cyan-500 to-blue-500";

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4">
          {/* 返回按钮 */}
          <Link
            href="/wiki"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回知践百科
          </Link>

          {/* 分类标签 */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} bg-opacity-20 text-white mb-6`}>
            <span className="text-sm font-medium">{article.category}</span>
          </div>

          {/* 标题 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-6 text-white/50">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author || "知践咨询"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{calcReadTime(article.content)}分钟阅读</span>
            </div>
          </div>
        </div>
      </section>

      {/* 文章内容 */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-4xl mx-auto px-4">
          {/* 摘要 */}
          {article.excerpt && (
            <div className="p-6 rounded-2xl bg-white/5 mb-8">
              <p className="text-white/70 leading-relaxed">{article.excerpt}</p>
            </div>
          )}

          {/* 标签 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass text-sm text-white/60">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 文章正文 */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-white/80 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* 底部操作栏 */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <Bookmark className="w-4 h-4" />
                收藏
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <Share2 className="w-4 h-4" />
                分享
              </button>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-gradient text-slate-900 font-semibold"
            >
              预约咨询
            </Link>
          </div>
        </div>
      </section>

      {/* 相关推荐 */}
      {relatedArticles.length > 0 && (
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-900" />
          <div className="relative max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">相关推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/wiki/${relatedArticle.id}`}
                  className="group glass rounded-2xl p-6 card-hover border border-white/5 hover:border-cyan-500/20"
                >
                  {/* 分类标签 */}
                  <div className="mb-3">
                    <span className="text-xs text-cyan-400">{relatedArticle.category}</span>
                  </div>
                  {/* 标题 */}
                  <h3 className="text-white font-semibold line-clamp-2 group-hover:text-cyan-400 transition-colors mb-2">
                    {relatedArticle.title}
                  </h3>
                  {/* 摘要 */}
                  <p className="text-white/40 text-sm line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  {/* 阅读 */}
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <span className="text-cyan-400/60 group-hover:text-cyan-400 text-xs font-medium transition-colors flex items-center gap-1">
                      阅读全文
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
