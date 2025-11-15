// src/pages/ExamDetail.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Clock3,
  Layers3,
  Tag,
  ArrowLeft,
  PlayCircle,
  Lock,
  Unlock,
  FolderGit2,
  CheckCircle2,
} from "lucide-react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { clearAttemptsForExam, generateAttemptId } from "../../utils/attempt";
import { requireAuth } from "../../utils/auth";

const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";

const formatDuration = (minutes) => {
  if (typeof minutes !== "number" || isNaN(minutes)) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} giờ ${m} phút`;
  if (h > 0) return `${h} giờ`;
  return `${m} phút`;
};

export default function ExamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
  const EXAM_URL = `${API_BASE}/api/exams/${id}`;

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Fetch exam by id
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(EXAM_URL, {
          headers: { accept: "*/*" },
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setExam(data || null);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [EXAM_URL]);

  const chips = useMemo(() => {
    if (!exam) return [];
    const items = [];

    items.push({
      icon: exam.isOpened ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />,
      text: exam.isOpened ? "Đang mở" : "Đã khóa",
      bg: "bg-green-100",
      fg: "text-green-700",
    });

    items.push({
      icon: <FolderGit2 className="w-4 h-4" />,
      text: exam.lessonId
        ? "Nguồn: Bài học"
        : exam.courseContentId
        ? "Nguồn: Nội dung khóa"
        : "Nguồn: Khác",
      bg: "bg-indigo-100",
      fg: "text-indigo-700",
    });

    if (typeof exam.totalCompleted === "number") {
      items.push({
        icon: <CheckCircle2 className="w-4 h-4" />,
        text: `Đã làm: ${exam.totalCompleted}`,
        bg: "bg-slate-100",
        fg: "text-slate-700",
      });
    }
    return items;
  }, [exam]);

  // ---- Not found / error / loading states
  if (loading) {
    return (
      <div className="min-h-screen w-screen max-w-none bg-white">
        <Header />
        <main className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-3xl text-sm text-slate-600">Đang tải đề thi…</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen w-screen max-w-none bg-white">
        <Header />
        <main className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-3xl">
            <Link to="/exam" className="inline-flex items-center gap-2 mb-6" style={{ color: PRIMARY }}>
              <ArrowLeft className="w-4 h-4" /> Quay lại thư viện đề thi
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Không thể tải dữ liệu</h1>
            <p className="text-gray-600">Chi tiết: {err}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen w-screen max-w-none bg-white">
        <Header />
        <main className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-3xl">
            <Link to="/exam" className="inline-flex items-center gap-2 mb-6" style={{ color: PRIMARY }}>
              <ArrowLeft className="w-4 h-4" /> Quay lại thư viện đề thi
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy đề thi</h1>
            <p className="text-gray-600">ID: {id}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* Hero / Breadcrumb */}
      <section className="w-full px-6 lg:px-12 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/exam" className="inline-flex items-center gap-2" style={{ color: PRIMARY }}>
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>
        </div>
      </section>

      {/* Title + meta chips */}
      <section className="w-full px-6 lg:px-12 pb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">{exam.title}</h1>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                {chips.map((c, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${c.bg} ${c.fg}`}
                  >
                    {c.icon}
                    {c.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 text-sm">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border">
                <Clock3 className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-800">
                  {formatDuration(exam.durationMinutes)}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border">
                <Layers3 className="w-4 h-4 text-gray-600" />
                {/* Nếu backend có totalQuestions bạn có thể thay exam.totalQuestions thay vì "—" */}
                <span className="font-medium text-gray-800">{typeof exam?.totalQuestions === "number" ? `${exam.totalQuestions} câu hỏi` : "— câu hỏi"}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border">
                <Tag className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-800">
                  {exam.lessonId ? "Bài học" : exam.courseContentId ? "Nội dung khóa" : "Khác"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main layout: content | sidebar */}
      <main className="w-full px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* LEFT: content */}
          <section className="space-y-8">
            {/* Video / Banner placeholder */}
            <div className="w-full aspect-video bg-gray-100 border rounded-2xl grid place-items-center text-gray-500">
              Xem demo/giới thiệu (tuỳ chọn)
            </div>

            {/* Mô tả */}
            <div className="bg-white border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed">
                {exam.description || "Chưa có mô tả cho đề thi này."}
              </p>
            </div>

            {/* Outcomes (tĩnh) */}
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bạn đạt được gì?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Làm bài trực tuyến, xem đáp án chi tiết.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Theo dõi tiến trình làm bài và lịch sử.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Ôn luyện theo lộ trình đề xuất.</span>
                </li>
              </ul>
            </div>

            {/* Syllabus (placeholder) */}
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cấu trúc bài thi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Phần 1", "Phần 2", "Phần 3", "Phần 4"].map((title, idx) => (
                  <div key={idx} className="border rounded-xl p-4">
                    <p className="font-semibold text-gray-900 mb-2">{title}</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {["Miêu tả", "Số câu hỏi", "Thời lượng gợi ý"].map((item, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-gray-400">–</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT: sidebar action */}
          <aside className="space-y-4">
            <div className="bg-white border rounded-2xl p-6 sticky top-24">
              <div className="mb-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-gray-50 border p-3">
                  <div className="text-xs text-gray-500">Trạng thái</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {exam.isOpened ? "Đang mở" : "Đã khóa"}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 border p-3">
                  <div className="text-xs text-gray-500">Thời lượng</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {formatDuration(exam.durationMinutes)}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 border p-3">
                  <div className="text-xs text-gray-500">Đã làm</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {typeof exam.totalCompleted === "number" ? exam.totalCompleted : 0}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: PRIMARY }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                onClick={() => {
                  // Tạo sẵn URL đích của attempt hiện tại
                  const newAttemptId = generateAttemptId();
                  const startUrl = `/exam/${id}/start/${newAttemptId}`;

                  // Nếu chưa đăng nhập, requireAuth sẽ lưu redirect = startUrl và điều hướng đến /login
                  const ok = requireAuth(navigate, startUrl);
                  if (!ok) return;

                  // Đảm bảo không bị "kẹt đã nộp" ở attempt cũ
                  clearAttemptsForExam(id);

                  // Đã đăng nhập → đi thẳng vào trang làm bài
                  navigate(startUrl, { replace: false });
                }}
              >
                <PlayCircle className="w-5 h-5" />
                Bắt đầu làm bài
              </button>

              <hr className="my-6" />

              <div className="text-xs text-gray-600 space-y-2">
                <p>• Làm bài trực tuyến, chấm điểm tự động.</p>
                <p>• Lưu tiến trình & xem lại đáp án chi tiết.</p>
                <p>• Cập nhật thêm câu hỏi theo lộ trình.</p>
              </div>
            </div>

            {/* Gợi ý khác */}
            <div className="bg-white border rounded-2xl p-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Bạn có thể quan tâm</p>
              <div className="space-y-3 text-sm">
                <Link to="/exam" className="block" style={{ color: PRIMARY }}>
                  Xem thêm đề thi khác
                </Link>
                <Link to="/courses" className="block" style={{ color: PRIMARY }}>
                  Khóa học liên quan
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
