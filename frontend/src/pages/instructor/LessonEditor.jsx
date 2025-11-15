"use client";

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Save, FileText, PlayCircle, HelpCircle, ArrowLeft, CheckCircle2, AlertTriangle,
  Undo2, Rocket
} from "lucide-react";

const API_BASE = "http://localhost:5102/api";

export default function LessonEdit() {
  const { id, lessonId } = useParams(); // id = courseContentId
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/course-content/${id}/lessons/${lessonId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setLesson(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải bài học.");
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [id, lessonId]);

  const saveLesson = async () => {
    try {
      const res = await fetch(`${API_BASE}/course-content/${id}/lessons/${lessonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lesson),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLesson(updated);
      setSavedAt(new Date());
    } catch {
      alert("Không thể lưu bài học.");
    }
  };

  // autosave mỗi 2 giây
  useEffect(() => {
    if (!lesson || lesson.published) return;
    const t = setTimeout(() => {
      saveLesson();
    }, 2000);
    return () => clearTimeout(t);
  }, [lesson]);

  const requestUpdate = async () => {
    try {
      await fetch(`${API_BASE}/course-content/${id}/lessons/${lessonId}/request-update`, {
        method: "POST",
      });
      alert("Đã gửi yêu cầu cập nhật bài học.");
      navigate(`/i/courses/${id}/lessons`);
    } catch {
      alert("Không thể gửi yêu cầu cập nhật.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="p-12 text-center text-gray-600">Đang tải dữ liệu bài học...</div>
        <Footer />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="p-12 text-center text-rose-600">{error}</div>
        <Footer />
      </div>
    );

  if (!lesson)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="p-12 text-center text-gray-600">Không có dữ liệu bài học.</div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              {lesson.type === "video" ? <PlayCircle className="w-6 h-6 text-blue-600" /> :
               lesson.type === "reading" ? <FileText className="w-6 h-6 text-amber-600" /> :
               <HelpCircle className="w-6 h-6 text-indigo-600" />}{" "}
              {lesson.title}
            </h1>
            <p className="text-gray-600">Chỉnh sửa nội dung bài học</p>
          </div>
          <Link
            to={`/i/courses/${id}/lessons`}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* status */}
        <div className="rounded-xl border bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {lesson.published ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" /> Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                <AlertTriangle className="w-4 h-4" /> Draft
              </span>
            )}
            {savedAt && <span className="text-xs text-gray-500">• Lưu {savedAt.toLocaleTimeString()}</span>}
          </div>
          <div className="flex items-center gap-2">
            {!lesson.published ? (
              <button
                onClick={saveLesson}
                className="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-1"
              >
                <Save className="w-4 h-4" /> Lưu
              </button>
            ) : (
              <button
                onClick={requestUpdate}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm flex items-center gap-1"
              >
                <Undo2 className="w-4 h-4" /> Gửi yêu cầu cập nhật
              </button>
            )}
          </div>
        </div>

        {/* content form */}
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Tiêu đề</span>
            <input
              value={lesson.title}
              onChange={(e) => setLesson((l) => ({ ...l, title: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Mô tả ngắn</span>
            <textarea
              value={lesson.description || ""}
              onChange={(e) => setLesson((l) => ({ ...l, description: e.target.value }))}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </label>

          {lesson.type === "video" && (
            <div className="space-y-2">
              <span className="text-sm text-gray-700">Video bài học</span>
              <input
                type="file"
                accept="video/*"
                className="border rounded-lg px-3 py-2 w-full"
                onChange={(e) =>
                  alert(`(Demo) File được chọn: ${e.target.files[0]?.name || "không có"}`)
                }
              />
              <input
                value={lesson.duration || ""}
                onChange={(e) => setLesson((l) => ({ ...l, duration: e.target.value }))}
                placeholder="Thời lượng (mm:ss)"
                className="border rounded-lg px-3 py-2 w-48"
              />
            </div>
          )}

          {lesson.type === "reading" && (
            <div>
              <span className="text-sm text-gray-700">Nội dung (Markdown hoặc HTML)</span>
              <textarea
                value={lesson.content || ""}
                onChange={(e) => setLesson((l) => ({ ...l, content: e.target.value }))}
                rows={10}
                className="w-full border rounded-lg px-3 py-2 mt-1 font-mono text-sm"
                placeholder="Nhập nội dung bài đọc..."
              />
            </div>
          )}

          {lesson.type === "quiz" && (
            <div>
              <span className="text-sm text-gray-700">Câu hỏi & đáp án (JSON hoặc form sau)</span>
              <textarea
                value={JSON.stringify(lesson.quiz || [], null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLesson((l) => ({ ...l, quiz: parsed }));
                  } catch {
                    // ignore invalid json
                  }
                }}
                rows={10}
                className="w-full border rounded-lg px-3 py-2 mt-1 font-mono text-sm"
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
