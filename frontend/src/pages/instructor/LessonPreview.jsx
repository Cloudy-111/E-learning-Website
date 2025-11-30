// src/pages/instructor/LessonPreview.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ArrowLeft, PlayCircle, FileText, HelpCircle, Clock, CheckCircle2, AlertTriangle
} from "lucide-react";

const API_BASE = "http://localhost:5102/api";

export default function LessonPreview() {
  const { id, lessonId } = useParams(); // id = courseContentId
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

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
        setError("Không thể tải bài học để xem trước.");
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [id, lessonId]);

  const submitQuiz = () => {
    if (!lesson?.quiz?.length) return;
    let correct = 0;
    lesson.quiz.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    setScore(`${correct}/${lesson.quiz.length}`);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center p-10 text-gray-600">Đang tải bài học...</div>
        <Footer />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center p-10 text-rose-600">{error}</div>
        <Footer />
      </div>
    );

  if (!lesson)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center p-10 text-gray-600">Không có dữ liệu bài học.</div>
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
              {lesson.type === "video" ? (
                <PlayCircle className="w-6 h-6 text-blue-600" />
              ) : lesson.type === "reading" ? (
                <FileText className="w-6 h-6 text-amber-600" />
              ) : (
                <HelpCircle className="w-6 h-6 text-indigo-600" />
              )}
              {lesson.title}
            </h1>
            <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              {lesson.published ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                  <AlertTriangle className="w-4 h-4" /> Draft
                </span>
              )}
              {lesson.duration && (
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" /> {lesson.duration}
                </span>
              )}
            </div>
          </div>
          <Link
            to={`/i/courses/${id}/lessons`}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </Link>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Video */}
        {lesson.type === "video" && (
          <div className="rounded-2xl border bg-black aspect-video overflow-hidden">
            {lesson.videoUrl ? (
              <video src={lesson.videoUrl} controls className="w-full h-full" />
            ) : (
              <div className="text-gray-400 text-center pt-32">
                (Chưa có video) — dùng API upload để thêm nội dung.
              </div>
            )}
          </div>
        )}

        {/* Reading */}
        {lesson.type === "reading" && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content || "" }} />
        )}

        {/* Quiz */}
        {lesson.type === "quiz" && (
          <div className="space-y-6">
            {lesson.quiz?.length ? (
              <>
                {lesson.quiz.map((q, idx) => (
                  <div key={idx} className="border rounded-xl p-4">
                    <div className="font-medium text-gray-900 mb-2">
                      Câu {idx + 1}: {q.question}
                    </div>
                    <div className="space-y-1">
                      {q.options.map((opt, i) => (
                        <label
                          key={i}
                          className={`block rounded-lg border px-3 py-2 cursor-pointer ${
                            answers[idx] === i ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            value={i}
                            checked={answers[idx] === i}
                            onChange={() => setAnswers((a) => ({ ...a, [idx]: i }))}
                            className="mr-2"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="text-right">
                  <button
                    onClick={submitQuiz}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Nộp bài
                  </button>
                  {score && (
                    <div className="mt-3 text-emerald-700 font-semibold">
                      Điểm của bạn: {score}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-gray-600">Chưa có câu hỏi nào trong quiz này.</div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
