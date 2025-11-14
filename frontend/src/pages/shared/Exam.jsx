// src/pages/Exam.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";

const Study4TestLibrary = () => {
  // ===== UI state =====
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [exams, setExams] = useState([]);

  const testsPerPage = 16;
  const navigate = useNavigate();

  const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
  // ✔ theo spec mới: /api/exam (không có “s”)
  const EXAMS_URL = `${API_BASE}/api/exams`;

  const EXAM_FILTERS = ["Tất cả", "Bài học", "Nội dung khóa", "Đang mở", "Đã khóa"];

  const formatDuration = (minutes) => {
    if (typeof minutes !== "number" || isNaN(minutes)) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h} giờ ${m} phút`;
    if (h > 0) return `${h} giờ`;
    return `${m} phút`;
  };

  const sourceLabel = (exam) => {
    if (exam.lessonId) return "Bài học";
    if (exam.courseContentId) return "Nội dung khóa";
    return "Khác";
  };

  // Fetch list
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(EXAMS_URL, {
          headers: { accept: "*/*" },
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setExams(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [EXAMS_URL]);

  // Filter + search
  const filtered = useMemo(() => {
    let list = exams;
    switch (selectedTab) {
      case "Bài học":
        list = list.filter((t) => t.lessonId);
        break;
      case "Nội dung khóa":
        list = list.filter((t) => t.courseContentId);
        break;
      case "Đang mở":
        list = list.filter((t) => t.isOpened === true);
        break;
      case "Đã khóa":
        list = list.filter((t) => t.isOpened === false);
        break;
    }
    const key = q.trim().toLowerCase();
    if (!key) return list;
    return list.filter(
      (t) =>
        (t.title || "").toLowerCase().includes(key) ||
        (t.description || "").toLowerCase().includes(key)
    );
  }, [exams, selectedTab, q]);

  // Paging
  const totalPages = Math.ceil(filtered.length / testsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * testsPerPage;
  const current = filtered.slice(startIdx, startIdx + testsPerPage);

  const goPage = (p) => {
    const np = Math.max(1, Math.min(totalPages, p));
    setCurrentPage(np);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, q]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-6">
        <div className="w-full px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-8">
            {/* LEFT */}
            <section>
              <h1 className="text-3xl font-bold text-[#1a1a1a] mb-6">Thư viện đề thi</h1>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-[#e0e0e0]">
                {EXAM_FILTERS.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedTab(type)}
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      selectedTab === type
                        ? "text-white"
                        : "bg-[#f8f9fa] text-[#677788] hover:bg-[#efefef]"
                    }`}
                    style={selectedTab === type ? { backgroundColor: PRIMARY } : {}}
                    type="button"
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Nhập từ khóa (tiêu đề, mô tả)…"
                    className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg text-sm focus:outline-none"
                    style={{ borderColor: "#e0e0e0" }}
                  />
                  <Search size={18} className="absolute right-3 top-2.5 text-[#8c98a4]" />
                </div>
                <button
                  className="px-6 py-2 text-white rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: PRIMARY }}
                  onClick={() => setCurrentPage(1)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY)
                  }
                  type="button"
                >
                  Tìm kiếm
                </button>
              </div>

              {/* Loading / Error */}
              {loading && (
                <div className="bg-white border border-[#e0e0e0] rounded-lg p-8 text-center text-sm text-[#677788] mb-8">
                  Đang tải đề thi…
                </div>
              )}
              {err && !loading && (
                <div className="bg-white border border-red-200 rounded-lg p-8 text-center text-sm text-red-600 mb-8">
                  Không thể tải dữ liệu (chi tiết: {err}). Kiểm tra API {EXAMS_URL} hoặc CORS.
                </div>
              )}

              {/* Grid */}
              {!loading && !err && (current.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                  {current.map((exam) => (
                    <div
                      key={exam.id}
                      className="bg-white border border-[#e0e0e0] rounded-lg p-4 hover:shadow-md transition-shadow h-full flex flex-col"
                    >
                      <div className="flex flex-col gap-3 h-full">
                        <h3 className="font-semibold text-[#1a1a1a] text-sm line-clamp-2">
                          {exam.title}
                        </h3>

                        <p className="text-xs text-[#677788] line-clamp-3">
                          {exam.description || "—"}
                        </p>

                        <div className="space-y-1 text-xs text-[#677788]">
                          <div className="flex items-center gap-2">
                            <span>⏱️</span>
                            <span>{formatDuration(exam.durationMinutes)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🔓</span>
                            <span>{exam.isOpened ? "Đang mở" : "Đã khóa"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📁</span>
                            <span>{sourceLabel(exam)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {exam.lessonId && (
                            <span className="text-xs px-2 py-1 bg-[#e8f2ff] text-[#35509a] rounded">
                              #lesson
                            </span>
                          )}
                          {exam.courseContentId && (
                            <span className="text-xs px-2 py-1 bg-[#e8f2ff] text-[#35509a] rounded">
                              #courseContent
                            </span>
                          )}
                          {typeof exam.totalCompleted === "number" && (
                            <span className="text-xs px-2 py-1 bg-[#f3f4f6] text-[#677788] rounded">
                              Đã làm: {exam.totalCompleted}
                            </span>
                          )}
                        </div>

                        {/* Nút luôn dính đáy card */}
                        <button
                          onClick={() => navigate(`/exam/${exam.id}`)}
                          className="w-full py-2 rounded-lg text-sm font-medium mt-auto transition-colors"
                          style={{
                            border: `1px solid ${PRIMARY}`,
                            color: "#fff",
                            backgroundColor: PRIMARY,
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = PRIMARY)
                          }
                          type="button"
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#e0e0e0] rounded-lg p-8 text-center text-sm text-[#677788] mb-8">
                  Không tìm thấy đề thi phù hợp với bộ lọc hiện tại.
                </div>
              ))}

              {/* Pagination */}
              {!loading && !err && filtered.length > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => goPage(safePage - 1)}
                    disabled={safePage === 1}
                    className="px-3 py-2 rounded-lg text-sm font-medium border"
                    style={{
                      borderColor: "#e0e0e0",
                      color: safePage === 1 ? "#a8b0bc" : "#677788",
                      cursor: safePage === 1 ? "not-allowed" : "pointer",
                    }}
                    type="button"
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      if (totalPages <= 5) return true;
                      if (p === 1 || p === totalPages) return true;
                      return Math.abs(p - safePage) <= 2;
                    })
                    .map((p, idx, arr) => {
                      const prev = arr[idx - 1];
                      const showEllipsis = prev && p - prev > 1;
                      const isActive = p === safePage;
                      return (
                        <span key={`p-${p}`} className="inline-flex">
                          {showEllipsis && <span className="px-2 text-[#a8b0bc]">…</span>}
                          <button
                            onClick={() => goPage(p)}
                            className="px-3 py-2 rounded-lg text-sm font-medium border"
                            style={
                              isActive
                                ? {
                                    backgroundColor: PRIMARY,
                                    color: "#fff",
                                    borderColor: PRIMARY,
                                  }
                                : { borderColor: "#e0e0e0", color: "#677788" }
                            }
                            type="button"
                          >
                            {p}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    onClick={() => goPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className="px-3 py-2 rounded-lg text-sm font-medium border"
                    style={{
                      borderColor: "#e0e0e0",
                      color: safePage === totalPages ? "#a8b0bc" : "#677788",
                      cursor: safePage === totalPages ? "not-allowed" : "pointer",
                    }}
                    type="button"
                  >
                    ›
                  </button>
                </div>
              )}
            </section>

            {/* RIGHT: Sidebar (giữ nguyên, đồng bộ màu nút) */}
            <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4 text-center">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">B</span>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">bilkecith</h3>
                <p className="text-xs text-[#677788] mb-3">
                  Đã học chưa có mục tiêu đề quá mục luyện tập của bạn. Tạo ngay
                </p>
                <button
                  className="w-full py-2 text-white rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY)
                  }
                  type="button"
                >
                  Thống kê kết quả
                </button>
              </div>

              <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                <img
                  src="/ielts-exam-preparation-banner.jpg"
                  alt="IELTS Banner"
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 font-bold">📊</span>
                  </div>
                  <h4 className="font-semibold text-[#1a1a1a] text-sm">SCORE CALCULATOR</h4>
                </div>
                <p className="text-xs text-[#677788] mb-3">Tính điểm thi IELTS</p>
                <button
                  className="w-full py-2 text-white rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY)
                  }
                  type="button"
                >
                  Tính điểm
                </button>
              </div>

              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">🔧</span>
                  </div>
                  <h4 className="font-semibold text-[#1a1a1a] text-sm">P Elearning</h4>
                </div>
                <p className="text-xs text-[#677788] mb-3">Trợ giúp phần facebook</p>
                <button
                  className="w-full py-2 text-white rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = PRIMARY)
                  }
                  type="button"
                >
                  Cài đặt
                </button>
              </div>

              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4">
                <img
                  src="/facebook-page-preview.jpg"
                  alt="Facebook Page"
                  className="w-full h-24 object-cover rounded mb-3"
                />
                <p className="text-xs text-[#677788] text-center">Theo dõi trang Facebook</p>
              </div>

              <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                <img
                  src="/ielts-course-promotion.jpg"
                  alt="Course Promo"
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#1a1a1a] mb-2">
                    Cộng đồng
                  </p>
                  <button
                    className="w-full py-2 text-white rounded-lg text-sm font-medium transition-colors"
                    style={{ backgroundColor: PRIMARY }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = PRIMARY)
                    }
                    type="button"
                  >
                    Xem khóa học
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                <img
                  src="/toeic-course-promotion.jpg"
                  alt="TOEIC Course"
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#1a1a1a] mb-2">
                    Nhóm chat
                  </p>
                  <button
                    className="w-full py-2 text-white rounded-lg text-sm font-medium transition-colors"
                    style={{ backgroundColor: PRIMARY }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = PRIMARY)
                    }
                    type="button"
                  >
                    Xem khóa học
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Study4TestLibrary;
