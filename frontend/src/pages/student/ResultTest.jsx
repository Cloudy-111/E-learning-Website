// src/pages/Results.jsx
"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, Clock, BarChart3, ChevronRight } from "lucide-react";

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedAnswer, setExpandedAnswer] = useState(null);

  // ===== Raw data (giữ nguyên cấu trúc bạn đưa) =====
  const results = {
    testName: "Kết quả bài trắc nghiệm Lập trình (Listening mock data)",
    totalCorrect: 0,
    totalWrong: 40,
    totalSkipped: 0,
    totalQuestions: 40,
    score: 0.0,
    accuracy: 0.0,
    completionTime: "0:01:56",
  };

  const recordings = [
    { id: 1, name: "Phần 1" },
    { id: 2, name: "Phần 2" },
    { id: 3, name: "Phần 3" },
    { id: 4, name: "Phần 4" },
  ];

  const questionCategories = [
    { name: "[Quiz] Điền từ/biểu thức", correct: 0, wrong: 10, skipped: 0, accuracy: "0.00%" },
  ];

  const answers = [
    {
      recording: 1,
      questions: [
        { num: 1, answer: "SYLVIA", userAnswer: "aaa", correct: false },
        { num: 2, answer: "ENGLAND", userAnswer: "aa", correct: false },
        { num: 3, answer: "26TH (OF) JULY [OR] JULY 26(TH) [OR] 26 JULY", userAnswer: "ấd", correct: false },
        { num: 4, answer: "TWO/2", userAnswer: "sdasd", correct: false },
        { num: 5, answer: "(ON) HOLIDAY", userAnswer: "ádas", correct: false },
        { num: 6, answer: "APARTMENT", userAnswer: "đá", correct: false },
        { num: 7, answer: "SECURE", userAnswer: "áđá", correct: false },
        { num: 8, answer: "(THE) MOTORWAY [OR] (THE) M1/MOTORWAY ACCESS", userAnswer: "ádasdas", correct: false },
        { num: 9, answer: "PALM BEACH", userAnswer: "ádasdas", correct: false },
        { num: 10, answer: "1500", userAnswer: "đâsdas", correct: false },
      ],
    },
    {
      recording: 2,
      questions: [
        { num: 11, answer: "B", userAnswer: "A", correct: false },
        { num: 12, answer: "A", userAnswer: "B", correct: false },
        { num: 13, answer: "A", userAnswer: "B", correct: false },
        { num: 14, answer: "C", userAnswer: "A", correct: false },
        { num: 15, answer: "TRAMPING", userAnswer: "ádasdasdasd", correct: false },
        { num: 16, answer: "WALKING/WALKS", userAnswer: "ádasdasdas", correct: false },
        { num: 17, answer: "ORGANIZER/ORGANISER", userAnswer: "đâsdasd", correct: false },
        { num: 18, answer: "VARIABLE", userAnswer: "ádasdas", correct: false },
        { num: 19, answer: "MYSTERY", userAnswer: "đâsdasd", correct: false },
        { num: 20, answer: "CHAIRMAN", userAnswer: "ádasdas", correct: false },
      ],
    },
  ];

  const comments = [
    { author: "HiPhan0102568aa481428d_28352", date: "Tháng 10. 17, 2025", text: "Trong lúc làm bài mình cảm giác rất căng thẳng vì sợ bản thân sai..." },
    { author: "bthuong2003", date: "Tháng 10. 16, 2025", text: "Mình đang đi làm, muốn tìm speaking partner vào buổi tối..." },
  ];

  // ===== Derived metrics (tự tính từ answers để hiển thị đẹp, vẫn giữ nguyên dữ liệu gốc) =====
  const derived = useMemo(() => {
    const all = answers.flatMap((r) => r.questions);
    const totalQ = all.length || results.totalQuestions;
    const totalCorrect = all.filter((q) => q.correct).length;
    const totalWrong = totalQ - totalCorrect;
    const accuracy = totalQ ? (totalCorrect / totalQ) * 100 : 0;

    return {
      totalQ,
      totalCorrect,
      totalWrong,
      accuracy,
      // thang điểm 10 đơn giản
      score10: Math.round((totalCorrect / (totalQ || 1)) * 10 * 10) / 10,
    };
  }, [answers]);

  // ==== UI helpers ====
  const StatCard = ({ icon, value, label, tone = "neutral" }) => {
    const toneMap = {
      neutral: "text-gray-800",
      primary: "text-blue-700",
      success: "text-emerald-700",
      danger: "text-rose-700",
    };
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-1">
          {icon}
          <span className={`text-2xl font-extrabold ${toneMap[tone]}`}>{value}</span>
        </div>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-screen max-w-none bg-gray-50 overflow-hidden">
      {/* Header sticky */}
      <Header />

      {/* Main */}
      <main className="w-screen grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        {/* LEFT */}
        <section className="h-[calc(100vh-64px)] overflow-y-auto px-6 md:px-8 py-6">
          {/* Title + actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{results.testName}</h1>
              <p className="text-sm text-gray-500 mt-1">Nền tảng học lập trình • Kết quả bài trắc nghiệm</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                Xem đáp án
              </button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                Quay về Thư viện đề
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <StatCard
              icon={<CheckCircle2 className="text-emerald-600" size={18} />}
              value={`${derived.totalCorrect}/${derived.totalQ}`}
              label="Trả lời đúng"
              tone="success"
            />
            <StatCard
              icon={<XCircle className="text-rose-600" size={18} />}
              value={derived.totalWrong}
              label="Trả lời sai"
              tone="danger"
            />
            <StatCard icon={<Clock className="text-gray-600" size={18} />} value={results.completionTime} label="Thời gian" />
            <StatCard icon={<BarChart3 className="text-blue-600" size={18} />} value={`${derived.accuracy.toFixed(1)}%`} label="Độ chính xác" tone="primary" />
            <StatCard icon={<BarChart3 className="text-gray-700" size={18} />} value={derived.score10.toFixed(1)} label="Điểm (thang 10)" />
          </div>

          {/* Progress bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Tiến độ hoàn thành</p>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                style={{ width: `${Math.min(100, (derived.totalQ ? (derived.totalCorrect / derived.totalQ) * 100 : 0))}%` }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[{ id: "overview", label: "Tổng quát" }, ...recordings.map((r, i) => ({ id: `rec-${r.id}`, label: r.name || `Phần ${i + 1}` }))].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab body */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Table summary */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Danh mục</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Đúng</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Sai</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Bỏ qua</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700">Chính xác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questionCategories.map((cat, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{cat.name}</td>
                            <td className="text-center py-3 px-4 text-emerald-700 font-medium">{cat.correct}</td>
                            <td className="text-center py-3 px-4 text-rose-700 font-medium">{cat.wrong}</td>
                            <td className="text-center py-3 px-4 text-gray-700">{cat.skipped}</td>
                            <td className="text-center py-3 px-4 text-gray-700">{cat.accuracy}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 font-semibold">
                          <td className="py-3 px-4 text-gray-800">Tổng</td>
                          <td className="text-center py-3 px-4 text-gray-800">{derived.totalCorrect}</td>
                          <td className="text-center py-3 px-4 text-gray-800">{derived.totalWrong}</td>
                          <td className="text-center py-3 px-4 text-gray-800">0</td>
                          <td className="text-center py-3 px-4 text-gray-800">{derived.accuracy.toFixed(2)}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Quick navigator */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Đi đến câu hỏi</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: Math.max(derived.totalQ, 10) }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
                          title={`Câu ${num}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Recording tabs */}
              {recordings.map((r) => {
                const tabId = `rec-${r.id}`;
                if (activeTab !== tabId) return null;
                const block = answers.find((b) => b.recording === r.id);

                return (
                  <div key={tabId} className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{r.name}</h3>
                    {block?.questions?.length ? (
                      block.questions.map((q) => {
                        const isCorrect = !!q.correct;
                        return (
                          <div
                            key={q.num}
                            className={`border rounded-xl p-4 hover:shadow-sm transition ${
                              isCorrect ? "border-emerald-300 bg-emerald-50/40" : "border-rose-200 bg-rose-50/40"
                            }`}
                          >
                            <div
                              className="flex items-start justify-between gap-3 cursor-pointer"
                              onClick={() => setExpandedAnswer(expandedAnswer === q.num ? null : q.num)}
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  Câu {q.num}. Đáp án đúng:{" "}
                                  <span className="text-gray-800">{q.answer}</span>
                                </p>
                                <p className="text-sm mt-1">
                                  Bạn trả lời:{" "}
                                  <span className={isCorrect ? "text-emerald-700 font-medium" : "text-rose-700 font-medium"}>
                                    {q.userAnswer}
                                  </span>
                                </p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                                {isCorrect ? "ĐÚNG" : "SAI"}
                              </span>
                            </div>

                            {expandedAnswer === q.num && (
                              <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                                <p>
                                  <strong>Giải thích:</strong> Khu vực này hiển thị phần giải thích chi tiết (ví dụ: vì sao đáp án này đúng,
                                  ví dụ mã nguồn/minh hoạ áp dụng cho bài trắc nghiệm lập trình).
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-gray-500 py-10">
                        Chưa có dữ liệu cho {r.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next */}
          <div className="mt-6 flex justify-end">
            <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold">
              TIẾP THEO <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* RIGHT: Comments */}
        <aside className="bg-gray-50 border-l border-gray-200 hidden lg:block">
          <div className="sticky top-16">
            <div className="bg-white p-6 shadow-sm h-[calc(100vh-64px)] overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bình luận</h3>

              {/* Comment form */}
              <div className="mb-6 pb-6 border-b">
                <textarea
                  placeholder="Chia sẻ cảm nghĩ của bạn..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 resize-none"
                  rows={3}
                />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Gửi
                </button>
              </div>

              {/* Comment list */}
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="pb-4 border-b last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{c.author}</p>
                        <p className="text-xs text-gray-500">{c.date}</p>
                        <p className="text-gray-700 mt-2 text-sm leading-relaxed">{c.text}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                          Trả lời
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                Xem thêm
              </button>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
