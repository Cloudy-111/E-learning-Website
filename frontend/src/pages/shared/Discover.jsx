"use client";

import { useMemo, useState } from "react";
import { Search, Clock, Layers, Cpu, Code2, Database, Cloud } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/**
 * DATA: Khóa học lập trình (thay cho TOEIC/IELTS)
 * - Giữ cấu trúc features + details để khớp design trước
 */
const COURSES = [
  {
    id: "js-foundation",
    title: "JavaScript Foundation",
    category: "Frontend Web",
    description:
      "Nền tảng JavaScript hiện đại: biến, scope, closure, this, async/await, module hoá, và làm quen DOM + fetch API.",
    features: [
      { label: "100+ bài tập Code", color: "cyan" },
      { label: "Project To-Do/Quiz App", color: "teal" },
      { label: "ES6+ Best Practices", color: "pink" },
    ],
    details: [
      {
        title: "Ngôn ngữ & Cú pháp",
        items: [
          "let/const, hoisting, scope & closure",
          "Prototype, OOP nhẹ trong JS",
          "Async: Promise, async/await",
        ],
      },
      {
        title: "Web APIs & Thực hành",
        items: ["DOM, fetch, localStorage", "Form validation", "Xử lý lỗi & loading states"],
      },
      {
        title: "Dự án nhỏ",
        items: ["To-Do App", "Quiz App (timers, results)", "Refactor theo clean code"],
      },
    ],
    topic: "web",
    duration: "4 tuần",
    students: "5,430+",
  },
  {
    id: "react-essentials",
    title: "ReactJS Essentials",
    category: "Frontend Web",
    description:
      "Xây dựng UI component-based với React: hooks, state, props, router, tối ưu hiệu năng & kiến trúc folder chuẩn.",
    features: [
      { label: "Router + State Mgmt", color: "cyan" },
      { label: "Hook thực chiến", color: "teal" },
      { label: "Clean Architecture", color: "pink" },
    ],
    details: [
      {
        title: "Cốt lõi",
        items: ["Component, Props, State", "Hooks: useState, useEffect, useMemo", "Context & tách logic"],
      },
      {
        title: "Routing & Data",
        items: ["react-router, nested routes", "Fetch & cache dữ liệu", "Form + validation"],
      },
      {
        title: "Best Practices",
        items: ["Folder convention", "UI patterns, memo hoá", "Error boundaries"],
      },
    ],
    topic: "web",
    duration: "5 tuần",
    students: "7,210+",
  },
  {
    id: "python-ds",
    title: "Python & Data Structures",
    category: "Core CS",
    description:
      "Học Python theo hướng thuật toán: mảng, stack/queue, hash map, tree/graph, complexity & pattern tư duy.",
    features: [
      { label: "120+ bài Leet-like", color: "cyan" },
      { label: "Phân tích độ phức tạp", color: "teal" },
      { label: "Template hoá lời giải", color: "pink" },
    ],
    details: [
      {
        title: "Python nhanh",
        items: ["List/Dict/Set/Comprehension", "Typing & dataclass", "I/O & exceptions"],
      },
      {
        title: "Cấu trúc dữ liệu",
        items: ["Two pointers, sliding window", "Stack/Queue/Heap/Hash", "Tree/Graph cơ bản"],
      },
      {
        title: "Thuật toán",
        items: ["DFS/BFS/Backtracking", "Greedy & DP cơ bản", "Complexity & tối ưu"],
      },
    ],
    topic: "cs",
    duration: "6 tuần",
    students: "4,980+",
  },
  {
    id: "node-api",
    title: "Node.js RESTful API",
    category: "Backend Web",
    description:
      "Thiết kế & triển khai RESTful API với Express, auth JWT, upload, pagination, logging, testing & deploy.",
    features: [
      { label: "Express & Middleware", color: "cyan" },
      { label: "Auth JWT/OAuth", color: "teal" },
      { label: "Test & Deploy", color: "pink" },
    ],
    details: [
      {
        title: "Kiến trúc & chuẩn hoá",
        items: ["Layered architecture", "Env & config", "Error handling, logger"],
      },
      {
        title: "Tính năng",
        items: ["CRUD chuẩn REST", "Auth JWT/Role", "Upload file, pagination, search"],
      },
      {
        title: "Triển khai",
        items: ["Unit/integration test", "CI/CD cơ bản", "Deploy (Railway/Render/VPS)"],
      },
    ],
    topic: "backend",
    duration: "4 tuần",
    students: "3,640+",
  },
  {
    id: "sql-practical",
    title: "SQL Practical for Dev",
    category: "Database",
    description:
      "Viết truy vấn hiệu quả: JOIN, window function, CTE, indexing, transaction & tối ưu thực thi.",
    features: [
      { label: "50+ bài tập data", color: "cyan" },
      { label: "Window functions", color: "teal" },
      { label: "Index & Explain", color: "pink" },
    ],
    details: [
      {
        title: "Truy vấn",
        items: ["JOIN/UNION/CTE", "GROUP BY/ROLLUP", "Window functions"],
      },
      {
        title: "Tối ưu",
        items: ["Index chiến lược", "Explain plan", "Anti-pattern thường gặp"],
      },
      {
        title: "An toàn dữ liệu",
        items: ["Transaction/Isolation", "Deadlock cơ bản", "Migration/versioning"],
      },
    ],
    topic: "db",
    duration: "3 tuần",
    students: "2,120+",
  },
  {
    id: "devops-begin",
    title: "DevOps cơ bản",
    category: "DevOps",
    description:
      "Pipeline CI/CD, container hoá với Docker, cơ bản Kubernetes & monitoring để ship nhanh – an toàn.",
    features: [
      { label: "Docker hoá dự án", color: "cyan" },
      { label: "CI/CD cơ bản", color: "teal" },
      { label: "K8s intro + Observability", color: "pink" },
    ],
    details: [
      {
        title: "Container hoá",
        items: ["Dockerfile best practices", "Compose multi-services", "Secrets & env"],
      },
      {
        title: "CI/CD",
        items: ["GitHub Actions", "Build/test/lint", "Auto deploy preview"],
      },
      {
        title: "K8s & Monitor",
        items: ["Concept k8s", "Health check, resource", "Log/metrics cơ bản"],
      },
    ],
    topic: "devops",
    duration: "4 tuần",
    students: "1,780+",
  },
];

/** Tag màu */
const tagColor = (color) =>
  ({
    cyan: "bg-cyan-100 text-cyan-700",
    teal: "bg-teal-100 text-teal-700",
    pink: "bg-pink-100 text-pink-700",
  }[color] || "bg-gray-100 text-gray-700");

/** Icon theo topic */
const TopicIcon = ({ topic, className = "w-4 h-4" }) => {
  const map = {
    web: <Code2 className={className} />,
    backend: <Layers className={className} />,
    cs: <Cpu className={className} />,
    db: <Database className={className} />,
    devops: <Cloud className={className} />,
  };
  return map[topic] || <Code2 className={className} />;
};

export default function Discover() {
  const [activeTab, setActiveTab] = useState("explore");
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("all");

  const topics = [
    { id: "all", label: "Tất cả" },
    { id: "web", label: "Frontend Web" },
    { id: "backend", label: "Backend" },
    { id: "cs", label: "CS/Algorithms" },
    { id: "db", label: "Database" },
    { id: "devops", label: "DevOps" },
  ];

  const filtered = useMemo(() => {
    const byTopic = topic === "all" ? COURSES : COURSES.filter((c) => c.topic === topic);
    if (!search.trim()) return byTopic;
    const q = search.toLowerCase();
    return byTopic.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [search, topic]);

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      {/* Header dùng chung */}
      <Header />

      {/* Hero + Tabs */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-gray-800" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Khám phá lộ trình học lập trình</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("my")}
              className={`pb-3 font-medium transition ${
                activeTab === "my" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Lịch học của tôi
            </button>
            <button
              onClick={() => setActiveTab("explore")}
              className={`pb-3 font-medium transition ${
                activeTab === "explore"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Khám phá
            </button>
          </div>

          {/* Search + Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <div className="relative md:flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm khóa học, chủ đề, kỹ năng..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-2 overflow-auto">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopic(t.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
                    topic === t.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* LEFT: Course list */}
          <section className="space-y-6">
            {filtered.map((course) => (
              <article
                key={course.id}
                className="bg-white border border-gray-200 rounded-2xl hover:shadow-md transition overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <TopicIcon topic={course.topic} />
                      <span className="truncate">{course.category}</span>
                      <span className="mx-1">•</span>
                      <span>{course.duration}</span>
                      <span className="mx-1">•</span>
                      <span>{course.students} học viên</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 truncate">{course.title}</h3>
                  </div>
                  <span className="shrink-0 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <p className="text-gray-700 leading-relaxed mb-4">{course.description}</p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.features.map((f, i) => (
                      <span key={i} className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${tagColor(f.color)}`}>
                        {f.label}
                      </span>
                    ))}
                  </div>

                  {/* Details: 3 cột */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
                    {course.details.map((d, i) => (
                      <div key={i}>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">{d.title}</h4>
                        <ul className="text-xs text-gray-700 space-y-1">
                          {d.items.map((it, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-gray-400">•</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
                      Xem chi tiết lộ trình
                    </button>
                    <button className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
                      Sử dụng lịch học này
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="text-center text-gray-600 py-16 border rounded-2xl">
                Không tìm thấy khóa học phù hợp. Hãy thử từ khóa khác hoặc chọn “Tất cả”.
              </div>
            )}
          </section>

          {/* RIGHT: Sidebar nhỏ gọn */}
          <aside className="space-y-6">
            {/* Quick tips */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h4 className="font-bold text-gray-900 mb-3">Mẹo chọn lộ trình</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Bắt đầu từ nền tảng (JS/Python) nếu bạn mới.</li>
                <li>• Chọn 1 hướng chính (Frontend/Backend/Data/DevOps).</li>
                <li>• Gắn mục tiêu theo tuần và đều đặn 60–90 phút/ngày.</li>
              </ul>
            </div>

            {/* Promo 1 */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5">
                <p className="text-sm text-slate-300 mb-1">Cộng đồng</p>
                <h4 className="text-white font-bold mb-2">Discord lập trình Study4</h4>
                <p className="text-slate-300 text-sm mb-4">
                  Chia sẻ code, review CV, mock interview mỗi tuần.
                </p>
                <button className="bg-white text-slate-900 rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90">
                  Tham gia ngay
                </button>
              </div>
            </div>

            {/* Promo 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">Github Template Dự án</h4>
              <p className="text-sm text-gray-700 mb-4">
                Boilerplate React/Node/SQL/CI-CD để bạn khởi tạo sản phẩm nhanh.
              </p>
              <button className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
                Xem template
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
