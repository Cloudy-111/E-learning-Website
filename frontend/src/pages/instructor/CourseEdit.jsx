// src/pages/instructor/CourseEdit.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Save, Rocket, Eye, Image as ImageIcon, Tag, Hash, Timer, Users, DollarSign, Star,
  CheckCircle2, Plus, Trash2, GripVertical, Sparkles, Globe2, BookOpen, Layers,
  ArrowLeft, ArrowRight, Pencil, AlertTriangle, Info, History, Copy, Undo2, BadgeCheck
} from "lucide-react";

/* ===== Mock repo (thay bằng API thực tế sau) ===== */
const MOCK_DB = {
  1: {
    id: 1,
    status: "draft",                 // 'draft' | 'published'
    currentVersion: 3,               // version đang sửa
    versions: [
      { v: 1, label: "v1 • initial publish", date: "2025-10-12", notes: "Bản phát hành đầu tiên" },
      { v: 2, label: "v2 • thêm quiz", date: "2025-10-28", notes: "Thêm 2 bài quiz + sửa mô tả" },
      { v: 3, label: "v3 • chỉnh curriculum", date: "2025-11-06", notes: "Tách 1 section & tối ưu tiêu đề" },
    ],
    basic: {
      title: "React 18 Pro — Hooks, Router, Performance",
      subtitle: "Xây UI hiện đại với React 18, quản lý state, router, form & tối ưu hiệu năng.",
      category: "Frontend Web",
      level: "Intermediate",
      lang: "Vietnamese",
      thumbnail: "",
      slug: "react-18-pro",
    },
    outcomes: [
      "Nắm vững React Hooks (useState/useEffect/useMemo/Context)",
      "Tổ chức folder & tối ưu hiệu năng",
      "Router, form, validation & patterns",
    ],
    requirements: ["JS cơ bản", "Node & npm", "Chrome DevTools"],
    curriculum: [
      {
        id: 11,
        title: "Giới thiệu & thiết lập",
        lessons: [
          { id: 1101, title: "Welcome & roadmap", type: "video", duration: "03:20" },
          { id: 1102, title: "Cài đặt môi trường", type: "video", duration: "08:15" },
        ],
      },
      {
        id: 12,
        title: "Hooks cốt lõi",
        lessons: [
          { id: 1201, title: "useState & tư duy state", type: "reading", duration: "" },
          { id: 1202, title: "useEffect & lifecycle", type: "video", duration: "12:40" },
        ],
      },
    ],
    pricing: { price: 990000, discount: 10 },
    seo: { keywords: ["react", "hooks", "router"], shortDesc: "Khoá React 18 thực chiến", isPublic: false, allowReviews: true },
  },
};

const NF = new Intl.NumberFormat("vi-VN");
const money = (v) => NF.format(v) + "đ";
const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const LEVELS = ["Beginner", "Intermediate", "Advanced", "All levels"];
const CATEGORIES = ["Frontend Web", "Backend", "Fullstack", "Mobile", "Data/AI", "Database", "DevOps", "Cloud"];
const LANGUAGES = ["Vietnamese", "English", "Japanese"];

export default function CourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 basic, 2 content, 3 seo
  const [savedAt, setSavedAt] = useState(null);

  // ===== Load mock data (thay bằng fetch API) =====
  const base = MOCK_DB[id] ?? MOCK_DB[1];

  // form states
  const [status, setStatus] = useState(base.status);
  const [version, setVersion] = useState(base.currentVersion);
  const [versions, setVersions] = useState(base.versions);

  const [basic, setBasic] = useState({ ...base.basic });
  const [outcomes, setOutcomes] = useState([...base.outcomes]);
  const [requirements, setRequirements] = useState([...base.requirements]);
  const [curriculum, setCurriculum] = useState([...base.curriculum]);
  const [pricing, setPricing] = useState({ ...base.pricing });
  const [seo, setSeo] = useState({ ...base.seo });

  useEffect(() => window.scrollTo(0, 0), []);

  // derived
  const finalPrice = Math.max(0, pricing.price - Math.floor((pricing.price * pricing.discount) / 100));
  const estRevenue = useMemo(() => Math.round(100 * 0.85 * finalPrice), [finalPrice]);

  // validation
  const errors = useMemo(() => {
    const e = {};
    if (!basic.title.trim()) e.title = "Vui lòng nhập tiêu đề";
    if (basic.title.length > 100) e.title = "Tiêu đề tối đa 100 ký tự";
    if (basic.subtitle.length > 160) e.subtitle = "Mô tả ngắn tối đa 160 ký tự";
    if (!outcomes.length) e.outcomes = "Thêm ít nhất 1 mục tiêu";
    if (!curriculum.length) e.curriculum = "Thêm ít nhất 1 section";
    return e;
  }, [basic.title, basic.subtitle, outcomes.length, curriculum.length]);

  const canPublish = Object.keys(errors).length === 0;

  // autosave demo
  useEffect(() => {
    const t = setTimeout(() => {
      setSavedAt(new Date());
      // TODO: PUT /courses/:id/draft
      // console.log("AUTOSAVE_EDIT", { id, version, basic, outcomes, requirements, curriculum, pricing, seo });
    }, 1200);
    return () => clearTimeout(t);
  }, [id, version, basic, outcomes, requirements, curriculum, pricing, seo]);

  // actions
  const saveDraft = () => {
    alert(`Đã lưu bản nháp v${version} (demo).`);
  };

  const publish = () => {
    if (!canPublish) {
      alert("Thiếu thông tin bắt buộc trước khi publish.");
      return;
    }
    setStatus("published");
    alert("Đã publish khoá (demo).");
  };

  const createNewVersion = () => {
    const v = version + 1;
    setVersion(v);
    setVersions((arr) => [
      ...arr,
      { v, label: `v${v} • new draft`, date: new Date().toISOString().slice(0, 10), notes: "Khởi tạo từ bản hiện tại" },
    ]);
    alert(`Đã tạo bản nháp v${v} (demo).`);
  };

  const cloneToDraft = (v) => {
    // demo: không thay state nội dung để ngắn gọn, thực tế sẽ load snapshot theo v
    setVersion(v);
    alert(`Đang chỉnh sửa trên snapshot v${v} (demo).`);
  };

  const revertTo = (v) => {
    // demo: không thay content, thực tế sẽ ghi đè form theo snapshot v
    alert(`Đã revert nội dung về v${v} (demo).`);
  };

  // curriculum helpers
  const addSection = () => {
    const id = Date.now();
    setCurriculum((c) => [...c, { id, title: `Section mới #${c.length + 1}`, lessons: [] }]);
  };
  const removeSection = (sid) => setCurriculum((c) => c.filter((s) => s.id !== sid));
  const moveSection = (sid, dir) => {
    setCurriculum((arr) => {
      const i = arr.findIndex((x) => x.id === sid);
      const j = dir === "up" ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= arr.length) return arr;
      const next = [...arr];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const addLesson = (sid) =>
    setCurriculum((c) =>
      c.map((s) =>
        s.id === sid
          ? { ...s, lessons: [...s.lessons, { id: Date.now(), title: "Bài học mới", type: "video", duration: "00:00" }] }
          : s
      )
    );
  const removeLesson = (sid, lid) =>
    setCurriculum((c) =>
      c.map((s) => (s.id === sid ? { ...s, lessons: s.lessons.filter((l) => l.id !== lid) } : s))
    );

  const statusBadge =
    status === "published"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">✏️ Sửa khoá #{id}</h1>
              <span className={`text-xs px-2 py-1 rounded-full ${statusBadge}`}>{status}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">v{version}</span>
            </div>
            <p className="text-gray-600">Chỉnh sửa bản nháp/phiên bản, cập nhật curriculum, giá và SEO</p>
          </div>

          <div className="flex items-center gap-3">
            {savedAt ? (
              <span className="text-xs text-gray-600 inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đã lưu {savedAt.toLocaleTimeString()}
              </span>
            ) : (
              <span className="text-xs text-gray-600 inline-flex items-center gap-2">
                <Info className="w-4 h-4" /> Chưa lưu
              </span>
            )}
            <Link to="/i/courses" className="text-sm text-blue-600 hover:text-blue-700">Quay lại danh sách</Link>
          </div>
        </div>
      </section>

      {/* Wizard header */}
      <main className="w-full px-6 lg:px-12 py-8">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          {[
            { id: 1, label: "Thông tin cơ bản" },
            { id: 2, label: "Nội dung & Giá" },
            { id: 3, label: "Cài đặt & SEO" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`px-3 py-1.5 rounded-full border ${
                step === s.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s.id}. {s.label}
            </button>
          ))}

          {/* Version tools */}
          <span className="ml-auto inline-flex items-center gap-2">
            <button
              onClick={saveDraft}
              className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Lưu
            </button>
            <button
              onClick={publish}
              className={`rounded-xl px-3 py-2 text-sm font-semibold inline-flex items-center gap-2 ${
                canPublish ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Rocket className="w-4 h-4" /> Publish
            </button>
            <button
              onClick={createNewVersion}
              className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <Copy className="w-4 h-4" /> New version
            </button>
          </span>
        </div>

        {/* Layout: form | sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* LEFT: forms */}
          <section className="space-y-8">
            {/* Step 1 — Basic */}
            {step === 1 && (
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">1) Thông tin cơ bản</h2>
                  <p className="text-sm text-gray-600">Tiêu đề, mô tả, danh mục, cấp độ, ngôn ngữ & slug.</p>
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">Tiêu đề khoá học *</span>
                    <input
                      value={basic.title}
                      onChange={(e) => setBasic((b) => ({ ...b, title: e.target.value }))}
                      className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
                        errors.title ? "border-rose-300 focus:ring-rose-200" : "border-gray-300 focus:ring-blue-200"
                      }`}
                    />
                    {errors.title && <span className="text-xs text-rose-600">{errors.title}</span>}
                  </label>

                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">Mô tả ngắn</span>
                    <textarea
                      value={basic.subtitle}
                      onChange={(e) => setBasic((b) => ({ ...b, subtitle: e.target.value }))}
                      rows={3}
                      className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
                        errors.subtitle ? "border-rose-300 focus:ring-rose-200" : "border-gray-300 focus:ring-blue-200"
                      }`}
                    />
                    {errors.subtitle && <span className="text-xs text-rose-600">{errors.subtitle}</span>}
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select
                      value={basic.category}
                      onChange={(e) => setBasic((b) => ({ ...b, category: e.target.value }))}
                      className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                      value={basic.level}
                      onChange={(e) => setBasic((b) => ({ ...b, level: e.target.value }))}
                      className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    >
                      {LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                      value={basic.lang}
                      onChange={(e) => setBasic((b) => ({ ...b, lang: e.target.value }))}
                      className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    >
                      {LANGUAGES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-3">
                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">Ảnh thumbnail (URL)</span>
                      <input
                        value={basic.thumbnail}
                        onChange={(e) => setBasic((b) => ({ ...b, thumbnail: e.target.value }))}
                        placeholder="https://..."
                        className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">Slug</span>
                      <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                        <span className="px-3 bg-gray-50 text-gray-600 text-sm inline-flex items-center"><Hash className="w-4 h-4 mr-1" />/courses/</span>
                        <input
                          value={basic.slug}
                          onChange={(e) => setBasic((b) => ({ ...b, slug: slugify(e.target.value) }))}
                          className="flex-1 px-3 outline-none text-sm"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Outcomes & Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CardList
                    title="Mục tiêu đạt được *"
                    icon={<Star className="w-4 h-4 text-amber-600" />}
                    items={outcomes}
                    setItems={setOutcomes}
                    required
                    error={errors.outcomes}
                  />
                  <CardList
                    title="Yêu cầu đầu vào"
                    icon={<Info className="w-4 h-4 text-blue-600" />}
                    items={requirements}
                    setItems={setRequirements}
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Content & Pricing */}
            {step === 2 && (
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">2) Nội dung & Giá</h2>
                  <p className="text-sm text-gray-600">Chỉnh sửa curriculum & thiết lập giá.</p>
                </div>

                {/* Curriculum */}
                <div className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Layers className="w-4 h-4 text-indigo-600" /> Curriculum *
                    </div>
                    <button onClick={addSection} className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50 inline-flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Thêm section
                    </button>
                  </div>

                  <div className="mt-3 space-y-3">
                    {curriculum.map((s, idx) => (
                      <div key={s.id} className="rounded-lg border">
                        <div className="p-3 flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <input
                            value={s.title}
                            onChange={(e) =>
                              setCurriculum((arr) =>
                                arr.map((x) => (x.id === s.id ? { ...x, title: e.target.value } : x))
                              )
                            }
                            className="flex-1 rounded-lg border px-3 py-2 text-sm"
                          />
                          <button onClick={() => moveSection(s.id, "up")} className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50">↑</button>
                          <button onClick={() => moveSection(s.id, "down")} className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50">↓</button>
                          <button onClick={() => removeSection(s.id)} className="rounded-lg border px-2 py-1.5 hover:bg-gray-50">
                            <Trash2 className="w-4 h-4 text-rose-600" />
                          </button>
                        </div>

                        {/* Lessons */}
                        <div className="px-3 pb-3 space-y-2">
                          {s.lessons.map((l) => (
                            <div key={l.id} className="rounded-lg border p-3 grid gap-2 md:grid-cols-[1fr_140px_120px_auto] md:items-center">
                              <input
                                value={l.title}
                                onChange={(e) =>
                                  setCurriculum((arr) =>
                                    arr.map((sec) =>
                                      sec.id === s.id
                                        ? {
                                            ...sec,
                                            lessons: sec.lessons.map((it) =>
                                              it.id === l.id ? { ...it, title: e.target.value } : it
                                            ),
                                          }
                                        : sec
                                    )
                                  )
                                }
                                className="rounded-lg border px-3 py-2 text-sm"
                              />
                              <select
                                value={l.type}
                                onChange={(e) =>
                                  setCurriculum((arr) =>
                                    arr.map((sec) =>
                                      sec.id === s.id
                                        ? {
                                            ...sec,
                                            lessons: sec.lessons.map((it) =>
                                              it.id === l.id ? { ...it, type: e.target.value } : it
                                            ),
                                          }
                                        : sec
                                    )
                                  )
                                }
                                className="rounded-lg border px-3 py-2 text-sm"
                              >
                                <option value="video">Video</option>
                                <option value="reading">Reading</option>
                                <option value="quiz">Quiz</option>
                              </select>
                              <input
                                value={l.duration}
                                onChange={(e) =>
                                  setCurriculum((arr) =>
                                    arr.map((sec) =>
                                      sec.id === s.id
                                        ? {
                                            ...sec,
                                            lessons: sec.lessons.map((it) =>
                                              it.id === l.id ? { ...it, duration: e.target.value } : it
                                            ),
                                          }
                                        : sec
                                    )
                                  )
                                }
                                placeholder="mm:ss"
                                className="rounded-lg border px-3 py-2 text-sm"
                              />
                              <div className="flex items-center justify-end">
                                <button
                                  onClick={() => removeLesson(s.id, l.id)}
                                  className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4 text-rose-600" /> Xoá
                                </button>
                              </div>
                            </div>
                          ))}

                          <button onClick={() => addLesson(s.id)} className="text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Thêm bài học
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.curriculum && <p className="text-xs mt-2 text-rose-600">{errors.curriculum}</p>}
                </div>

                {/* Pricing */}
                <div className="rounded-xl border p-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Giá bán (VND)
                    </span>
                    <input
                      type="number"
                      value={pricing.price}
                      onChange={(e) => setPricing((p) => ({ ...p, price: Math.max(0, +e.target.value || 0) }))}
                      className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">Giảm giá (%)</span>
                    <input
                      type="number"
                      value={pricing.discount}
                      onChange={(e) =>
                        setPricing((p) => ({ ...p, discount: Math.min(90, Math.max(0, +e.target.value || 0)) }))
                      }
                      className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                  <div className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">Giá sau giảm</span>
                    <div className="rounded-xl border px-4 py-2 text-gray-900 bg-gray-50">{money(finalPrice)}</div>
                    <div className="text-xs text-gray-600">Ước tính doanh thu (100 HV, net 85%): <b>{money(estRevenue)}</b></div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — SEO */}
            {step === 3 && (
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">3) Cài đặt & SEO</h2>
                  <p className="text-sm text-gray-600">Từ khoá, mô tả SEO, quyền hiển thị & review.</p>
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Từ khoá (Enter để thêm)
                    </span>
                    <TagInput value={seo.keywords} onChange={(kws) => setSeo((x) => ({ ...x, keywords: kws }))} />
                  </label>

                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">Mô tả SEO (≤ 160 ký tự)</span>
                    <textarea
                      value={seo.shortDesc}
                      onChange={(e) => setSeo((x) => ({ ...x, shortDesc: e.target.value.slice(0, 160) }))}
                      rows={3}
                      className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <span className="text-xs text-gray-500">{seo.shortDesc.length} / 160</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-4">
                    <label className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={seo.isPublic}
                        onChange={(e) => setSeo((x) => ({ ...x, isPublic: e.target.checked }))}
                      />
                      Public (hiển thị marketplace)
                    </label>
                    <label className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={seo.allowReviews}
                        onChange={(e) => setSeo((x) => ({ ...x, allowReviews: e.target.checked }))}
                      />
                      Cho phép đánh giá
                    </label>
                  </div>

                  {!canPublish && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 inline-flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5" />
                      <div>
                        Cần hoàn thiện trước khi publish:
                        <ul className="list-disc ml-5">
                          {errors.title && <li>Tiêu đề khoá</li>}
                          {errors.outcomes && <li>Ít nhất 1 mục tiêu</li>}
                          {errors.curriculum && <li>Curriculum (≥ 1 section)</li>}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wizard nav */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
                  step === 1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Trước
              </button>

              <div className="flex gap-2">
                <button
                  onClick={saveDraft}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 hover:bg-gray-50"
                >
                  <Save className="w-4 h-4" /> Lưu nháp
                </button>
                <button
                  onClick={publish}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 ${
                    canPublish ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Rocket className="w-4 h-4" /> Publish
                </button>
                <button
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  disabled={step === 3}
                  className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
                    step === 3 ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"
                  }`}
                >
                  Tiếp <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT: versions & preview */}
          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
            {/* Versions */}
            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900 inline-flex items-center gap-2">
                  <History className="w-4 h-4" /> Phiên bản
                </h4>
                <span className="text-xs text-gray-500">Hiện tại: v{version}</span>
              </div>
              <div className="mt-3 space-y-2">
                {versions.map((it) => (
                  <div key={it.v} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{it.label}</div>
                        <div className="text-xs text-gray-600">{it.date} • {it.notes}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cloneToDraft(it.v)}
                          className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50 inline-flex items-center gap-1"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => revertTo(it.v)}
                          className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50 inline-flex items-center gap-1"
                        >
                          <Undo2 className="w-3.5 h-3.5" /> Revert
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={createNewVersion}
                className="mt-3 w-full rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" /> Tạo bản nháp mới
              </button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="aspect-video bg-gray-100 grid place-items-center text-gray-500">
                {basic.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={basic.thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Thumbnail Preview
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-600 mb-1">
                  {basic.category} • {basic.level} • <Globe2 className="inline w-3.5 h-3.5 mr-1" />{basic.lang}
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {basic.title || "Tiêu đề khoá học"}
                </h3>
                <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                  {basic.subtitle || "Mô tả ngắn sẽ hiển thị ở đây..."}
                </p>

                <div className="mt-3 text-sm text-gray-700 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Users className="w-4 h-4" /> — HV</span>
                  <span className="inline-flex items-center gap-1"><Timer className="w-4 h-4" /> ~ {curriculum.reduce((s, sec) => s + sec.lessons.length, 0)} bài</span>
                  <span className="inline-flex items-center gap-1"><DollarSign className="w-4 h-4" /> {money(finalPrice)}</span>
                </div>

                {seo.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {seo.keywords.slice(0, 6).map((k) => (
                      <span key={k} className="text-xs px-2 py-1 rounded-full border">@{k}</span>
                    ))}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <button className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> Xem trang public
                  </button>
                  <Link to={`/i/courses/${id}/lessons`} className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" /> Quản lý bài học
                  </Link>
                </div>

                <div className="mt-4 rounded-xl border p-3">
                  <h5 className="text-xs font-semibold text-gray-900 mb-1">Checklist xuất bản</h5>
                  <ul className="text-xs space-y-1">
                    <li className={`inline-flex items-center gap-2 ${basic.title ? "text-emerald-700" : "text-gray-700"}`}>
                      <CheckCircle2 className="w-4 h-4" /> Tiêu đề khoá
                    </li>
                    <li className={`inline-flex items-center gap-2 ${outcomes.length ? "text-emerald-700" : "text-gray-700"}`}>
                      <CheckCircle2 className="w-4 h-4" /> Ít nhất 1 mục tiêu
                    </li>
                    <li className={`inline-flex items-center gap-2 ${curriculum.length ? "text-emerald-700" : "text-gray-700"}`}>
                      <CheckCircle2 className="w-4 h-4" /> Có section/lesson
                    </li>
                    <li className="inline-flex items-center gap-2 text-gray-700">
                      <BadgeCheck className="w-4 h-4 text-indigo-600" /> Thumbnail (khuyến nghị)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border bg-white p-5">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Liên kết nhanh</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/i/courses" className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Danh sách khoá
                </Link>
                <Link to={`/i/courses/${id}/students`} className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2">
                  <Users className="w-4 h-4" /> Học viên
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

/* ====== Reusable components ====== */
function CardList({ title, icon, items, setItems, required = false, error }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
        {icon} {title}
      </div>
      <ul className="space-y-2">
        {items.map((o, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              value={o}
              onChange={(e) => setItems((arr) => arr.map((x, idx) => (idx === i ? e.target.value : x)))}
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              onClick={() => setItems((arr) => arr.filter((_, idx) => idx !== i))}
              className="rounded-lg border px-2 py-2 hover:bg-gray-50"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setItems((arr) => [...arr, ""])}
        className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Thêm
      </button>
      {required && error && <p className="text-xs mt-2 text-rose-600">{error}</p>}
    </div>
  );
}

function TagInput({ value = [], onChange }) {
  const [text, setText] = useState("");
  const add = (v) => {
    const k = v.trim().toLowerCase();
    if (!k) return;
    if (value.includes(k)) return setText("");
    onChange([...value, k]);
    setText("");
  };
  return (
    <div className="rounded-xl border border-gray-300 px-3 py-2">
      <div className="flex flex-wrap gap-2">
        {value.map((k) => (
          <span key={k} className="text-xs px-2 py-1 rounded-full border inline-flex items-center gap-2">
            #{k}
            <button
              onClick={() => onChange(value.filter((x) => x !== k))}
              className="rounded border px-1 hover:bg-gray-50"
              title="Xoá"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(text);
            }
          }}
          placeholder="Nhập từ khoá rồi Enter…"
          className="min-w-[160px] flex-1 outline-none text-sm"
        />
      </div>
    </div>
  );
}




















































