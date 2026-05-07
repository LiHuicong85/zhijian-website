"use client";

import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  label_wen: string;
  is_published: boolean;
  view_count: number;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    label_wen: "",
    is_published: true,
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const result = await res.json();
      if (result.success) {
        setArticles(result.data || []);
      }
    } catch (error) {
      console.error("加载失败:", error);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=article");
      const result = await res.json();
      if (result.success && result.data) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("加载分类失败:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("请输入标题");
      return;
    }
    try {
      const url = editingId ? `/api/articles/${editingId}` : "/api/articles";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      
      if (result.success) {
        alert(editingId ? "更新成功" : "创建成功");
        setShowModal(false);
        resetForm();
        fetchArticles();
      } else {
        alert(result.error || "操作失败");
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败");
    }
  };

  const handleEdit = (item: Article) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      content: item.content || "",
      author: item.author || "",
      label_wen: item.label_wen || "",
      is_published: item.is_published ?? true,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      author: "",
      label_wen: "",
      is_published: true,
    });
  };

  const openNew = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", padding: "24px" }}>
      {/* 头部 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>文章管理</h1>
        <button
          onClick={openNew}
          style={{ background: "#00D4FF", color: "#000", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}
        >
          + 新增文章
        </button>
      </div>

      {/* 列表 */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>加载中...</div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>暂无文章</div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {articles.map((item) => (
            <div key={item.id} style={{ background: "#1a2744", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}>{item.title}</div>
                <div style={{ color: "#00D4FF", fontSize: "14px" }}>
                  {item.author}
                  {item.label_wen ? ` | ${item.label_wen}` : ""}
                </div>
                <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>
                  {item.is_published ? "已发布" : "未发布"} | 浏览 {item.view_count} | {item.created_at?.slice(0, 10)}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEdit(item)} style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                  编辑
                </button>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/articles/${item.id}`, { method: "DELETE" });
                      const result = await res.json();
                      if (result.success) {
                        await fetchArticles();
                        alert("删除成功！");
                      } else {
                        alert("删除失败: " + (result.error || "未知错误"));
                      }
                    } catch (error) {
                      alert("删除异常: " + String(error));
                    }
                  }}
                  style={{ background: "#dc2626", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 弹窗 */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1a2744", borderRadius: "16px", padding: "24px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflow: "auto" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>{editingId ? "编辑文章" : "新增文章"}</h2>
            
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>标题</label>
                <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "8px", color: "#1a2a3a" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>作者</label>
                <input value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "8px", color: "#1a2a3a" }} />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>分类</label>
                <select 
                  value={formData.label_wen} 
                  onChange={(e) => setFormData({...formData, label_wen: e.target.value})}
                  style={{ width: "100%", padding: "10px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "8px", color: "#1a2a3a" }}
                >
                  <option value="">请选择分类</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>内容</label>
                <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={8}
                  style={{ width: "100%", padding: "10px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "8px", color: "#1a2a3a", resize: "vertical" }} />
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} />
                <label>发布</label>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", justifyContent: "flex-end" }}>
              <button onClick={() => { setShowModal(false); resetForm(); }} style={{ padding: "10px 20px", background: "#333", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                取消
              </button>
              <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#00D4FF", color: "#000", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
