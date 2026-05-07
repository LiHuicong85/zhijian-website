"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<"case" | "article">("case");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState(0);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/categories?type=${activeTab}`);
      const result = await res.json();
      if (result.success) {
        setCategories(result.data || []);
      }
    } catch (error) {
      console.error("获取分类失败:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), sort_order: newOrder, type: activeTab }),
      });
      const result = await res.json();
      if (result.success) {
        setShowAdd(false);
        setNewName("");
        setNewOrder(0);
        fetchCategories();
      } else {
        alert(result.error || "添加失败");
      }
    } catch {
      alert("添加异常");
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    try {
      const res = await fetch(`/api/categories/${id}?type=${activeTab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), sort_order: editOrder }),
      });
      const result = await res.json();
      if (result.success) {
        setEditingId(null);
        fetchCategories();
      } else {
        alert(result.error || "更新失败");
      }
    } catch {
      alert("更新异常");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}?type=${activeTab}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        fetchCategories();
      } else {
        alert(result.error || "删除失败");
      }
    } catch {
      alert("删除异常");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", padding: "24px" }}>
      {/* 头部 */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>分类管理</h1>

      {/* Tab 切换 */}
      <div style={{ display: "flex", gap: "0", marginBottom: "24px" }}>
        <button
          onClick={() => setActiveTab("case")}
          style={{
            padding: "10px 24px",
            border: "1px solid",
            borderColor: activeTab === "case" ? "#00D4FF" : "#444",
            background: activeTab === "case" ? "#00D4FF" : "transparent",
            color: activeTab === "case" ? "#000" : "#888",
            borderRadius: "8px 0 0 8px",
            cursor: "pointer",
            fontWeight: activeTab === "case" ? "bold" : "normal",
            fontSize: "15px",
          }}
        >
          案例行业分类
        </button>
        <button
          onClick={() => setActiveTab("article")}
          style={{
            padding: "10px 24px",
            border: "1px solid",
            borderColor: activeTab === "article" ? "#00D4FF" : "#444",
            background: activeTab === "article" ? "#00D4FF" : "transparent",
            color: activeTab === "article" ? "#000" : "#888",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
            fontWeight: activeTab === "article" ? "bold" : "normal",
            fontSize: "15px",
          }}
        >
          文章分类
        </button>
      </div>

      {/* 新增按钮 */}
      <button
        onClick={() => setShowAdd(true)}
        style={{ background: "#00D4FF", color: "#000", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", marginBottom: "20px" }}
      >
        + 新增分类
      </button>

      {/* 新增表单 */}
      {showAdd && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px", border: "1px solid #2a5080" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <label style={{ display: "block", marginBottom: "4px", color: "#c0d8f0", fontSize: "14px" }}>分类名称</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="输入分类名称"
                style={{ padding: "8px 12px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "6px", color: "#1a2a3a", fontSize: "14px", width: "200px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "4px", color: "#c0d8f0", fontSize: "14px" }}>排序</label>
              <input
                type="number"
                value={newOrder}
                onChange={(e) => setNewOrder(Number(e.target.value))}
                style={{ padding: "8px 12px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "6px", color: "#1a2a3a", fontSize: "14px", width: "80px" }}
              />
            </div>
            <button onClick={handleAdd} style={{ padding: "8px 20px", background: "#00D4FF", color: "#000", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
              确认添加
            </button>
            <button onClick={() => { setShowAdd(false); setNewName(""); setNewOrder(0); }} style={{ padding: "8px 20px", background: "#555", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              取消
            </button>
          </div>
        </div>
      )}

      {/* 分类列表 */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>加载中...</div>
      ) : categories.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>暂无分类</div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ background: "#1e3a5f", borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #2a5080" }}>
              {editingId === cat.id ? (
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: "8px 12px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "6px", color: "#1a2a3a", fontSize: "14px", width: "200px" }}
                  />
                  <input
                    type="number"
                    value={editOrder}
                    onChange={(e) => setEditOrder(Number(e.target.value))}
                    style={{ padding: "8px 12px", background: "#f0f4f8", border: "1px solid #b0c4d8", borderRadius: "6px", color: "#1a2a3a", fontSize: "14px", width: "80px" }}
                  />
                  <button onClick={() => handleUpdate(cat.id)} style={{ padding: "6px 16px", background: "#00D4FF", color: "#000", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
                    保存
                  </button>
                  <button onClick={() => setEditingId(null)} style={{ padding: "6px 16px", background: "#555", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px" }}>
                    取消
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#00D4FF", fontSize: "13px", minWidth: "30px" }}>#{cat.sort_order}</span>
                    <span style={{ fontSize: "16px", fontWeight: "500" }}>{cat.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => { setEditingId(cat.id); setEditName(cat.name); setEditOrder(cat.sort_order); }}
                      style={{ padding: "6px 16px", background: "#2563eb", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px" }}
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      style={{ padding: "6px 16px", background: "#dc2626", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px" }}
                    >
                      删除
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
