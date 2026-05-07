"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { BookOpen, Calendar, User, Search, ChevronDown, Lightbulb, Sparkles, FileText } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  content: string;
  label_wen: string;
  is_published: boolean;
  created_at: string;
}

const MAX_VISIBLE_TABS = 5;

export default function WikiPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      const result = await res.json();
      if (result.success) {
        const published = result.data.filter((a: Article) => a.is_published !== false);
        setArticles(published);
      }
    } catch (error) {
      console.error("加载文章失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=article");
      const result = await res.json();
      if (result.success && result.data) {
        setCategories(result.data.map((c: { name: string }) => c.name));
      }
    } catch {
      // fallback: 从文章数据中提取分类
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "全部" || article.label_wen === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("zh-CN");
    } catch {
      return dateStr;
    }
  };

  const visibleCategories = categories.slice(0, MAX_VISIBLE_TABS);
  const moreCategories = categories.slice(MAX_VISIBLE_TABS);

  return (
    <div className="pt-24 page-enter">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />
        
        <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        <div className="absolute top-40 right-20 w-px h-60 bg-gradient-to-b from-cyan-500/30 to-transparent" />
        <div className="absolute bottom-20 left-1/4 w-px h-32 bg-gradient-to-b from-purple-500/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">专业洞察 · 实战分享</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">知践百科</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              深度解读企业管理与数智化转型之道
            </p>
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 text-white/40">
                <FileText className="w-5 h-5" />
                <span className="text-sm">{articles.length} 篇专业文章</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2 text-white/40">
                <Lightbulb className="w-5 h-5" />
                <span className="text-sm">{categories.length} 个主题</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 relative -mt-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="搜索文章标题或内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full glass text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { setActiveCategory("全部"); setMoreOpen(false); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === "全部"
                  ? "btn-gradient text-slate-900 shadow-md shadow-cyan-500/20"
                  : "glass text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              全部
            </button>
            {visibleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setMoreOpen(false); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "btn-gradient text-slate-900 shadow-md shadow-cyan-500/20"
                    : "glass text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
            {moreCategories.length > 0 && (
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 glass text-white/80 hover:text-white hover:bg-white/10 ${
                    moreOpen ? "ring-1 ring-cyan-400/50" : ""
                  }`}
                >
                  更多主题
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl glass-strong border border-white/10 py-2 z-50 shadow-xl">
                    {moreCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setMoreOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors ${
                          activeCategory === cat
                            ? "text-cyan-400 bg-cyan-500/10"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Articles - 科技感卡片布局 */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredArticles.map((article) => {
                  return (
                    <Link
                      key={article.id}
                      href={`/wiki/${article.id}`}
                      className="group relative"
                    >
                      <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-white/5 group-hover:border-cyan-500/30 transition-all duration-500" />
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500" />
                        
                        <div className="relative p-6 pl-8">
                          {/* 顶部：分类 + 标签 */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                                <Lightbulb className="w-5 h-5 text-cyan-400" />
                              </div>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                {article.label_wen || "未分类"}
                              </span>
                            </div>
                          </div>
                          
                          {/* 标题 */}
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                            {article.title}
                          </h3>
                          
                          {/* 内容预览 */}
                          <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                            {article.content?.slice(0, 120)}...
                          </p>
                          
                          {/* 底部：作者 + 日期 */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-4 text-white/40 text-xs">
                              {article.author && (
                                <span className="flex items-center gap-1.5 group-hover:text-white/50 transition-colors">
                                  <User className="w-3.5 h-3.5" />
                                  {article.author}
                                </span>
                              )}
                              <span className="flex items-center gap-1.5 group-hover:text-white/50 transition-colors">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(article.created_at)}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-cyan-400/0 group-hover:text-cyan-400/80 text-xs font-medium transition-all duration-500">
                              <span>阅读全文</span>
                              <div className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 rounded-2xl border border-cyan-500/30 animate-pulse" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-white/10" />
                  </div>
                  <p className="text-white/40 text-lg mb-2">暂无相关文章</p>
                  <p className="text-white/20 text-sm">尝试更换分类或搜索关键词</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
