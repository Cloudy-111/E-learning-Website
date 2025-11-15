// // src/pages/instructor/CourseNew.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   Save, Rocket, Eye, Image as ImageIcon, Tag, Hash, Timer, Users, DollarSign, Star,
//   CheckCircle2, Plus, Trash2, GripVertical, Sparkles, Globe2, BookOpen, Layers,
//   ArrowLeft, ArrowRight, Pencil, AlertTriangle, Info
// } from "lucide-react";

// /* ===== Helpers ===== */
// const nf = new Intl.NumberFormat("vi-VN");
// const money = (v) => nf.format(v) + "đ";
// const slugify = (s) =>
//   s
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");

// const LEVELS = ["Beginner", "Intermediate", "Advanced", "All levels"];
// const CATEGORIES = [
//   "Frontend Web", "Backend", "Fullstack", "Mobile", "Data/AI", "Database", "DevOps", "Cloud"
// ];
// const LANGUAGES = ["Vietnamese", "English", "Japanese"];

// /* ===== Page ===== */
// export default function CourseNew() {
//   const navigate = useNavigate();

//   // wizard steps
//   const [step, setStep] = useState(1); // 1=Basic, 2=Content&Pricing, 3=Settings&SEO
//   const next = () => setStep((s) => Math.min(3, s + 1));
//   const prev = () => setStep((s) => Math.max(1, s - 1));

//   // autosave demo
//   const [savedAt, setSavedAt] = useState(null);
//   useEffect(() => window.scrollTo(0, 0), []);

//   // form state
//   const [basic, setBasic] = useState({
//     title: "",
//     subtitle: "",
//     category: "Frontend Web",
//     level: "Beginner",
//     lang: "Vietnamese",
//     thumbnail: "", // URL demo
//   });
//   const [slug, setSlug] = useState("");

//   const [curriculum, setCurriculum] = useState([
//     { id: 1, title: "Giới thiệu khoá học", lessons: [{ id: 11, title: "Chào mừng & mục tiêu", type: "video", duration: "03:20" }] },
//   ]);

//   const [outcomes, setOutcomes] = useState(["Nắm được mục tiêu khoá", "Thiết lập môi trường"]);
//   const [requirements, setRequirements] = useState(["Máy tính kết nối internet"]);

//   const [pricing, setPricing] = useState({
//     price: 990000,
//     discount: 0,
//   });

//   const [seo, setSeo] = useState({
//     keywords: ["react", "frontend"],
//     shortDesc: "",
//     isPublic: false,
//     allowReviews: true,
//   });

//   // derived
//   useEffect(() => {
//     if (!basic.title) return setSlug("");
//     setSlug(slugify(basic.title));
//   }, [basic.title]);

//   const finalPrice = Math.max(0, pricing.price - Math.floor((pricing.price * pricing.discount) / 100));
//   const estRevenue = useMemo(() => {
//     // demo ước tính: 100 enrolls * net(85%) * finalPrice
//     const enrolls = 100;
//     const net = 0.85;
//     return Math.round(enrolls * net * finalPrice);
//   }, [finalPrice]);

//   // validation
//   const errors = useMemo(() => {
//     const e = {};
//     if (!basic.title.trim()) e.title = "Vui lòng nhập tiêu đề khoá học";
//     if (basic.title.length > 100) e.title = "Tiêu đề tối đa 100 ký tự";
//     if (basic.subtitle.length > 160) e.subtitle = "Mô tả ngắn tối đa 160 ký tự";
//     if (!outcomes.length) e.outcomes = "Thêm ít nhất 1 mục tiêu đạt được";
//     if (!curriculum.length) e.curriculum = "Thêm ít nhất 1 section";
//     return e;
//   }, [basic.title, basic.subtitle, outcomes.length, curriculum.length]);

//   const canPublish = Object.keys(errors).length === 0 && finalPrice >= 0;

//   // autosave (demo): khi state thay đổi, sau 1.2s thì "lưu"
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setSavedAt(new Date());
//       // TODO backend: post draft payload
//       // console.log("AUTOSAVE", { basic, slug, outcomes, requirements, curriculum, pricing, seo });
//     }, 1200);
//     return () => clearTimeout(t);
//   }, [basic, slug, outcomes, requirements, curriculum, pricing, seo]);

//   const saveDraft = () => {
//     // demo
//     // console.log("SAVE_DRAFT", { basic, slug, outcomes, requirements, curriculum, pricing, seo });
//     alert("Đã lưu bản nháp (demo).");
//   };

//   const publishDraft = () => {
//     if (!canPublish) {
//       alert("Vui lòng hoàn thiện các mục bắt buộc trước khi publish.");
//       return;
//     }
//     alert("Đã gửi publish (demo).");
//     navigate("/i/courses");
//   };

//   // curriculum helpers
//   const addSection = () => {
//     const id = Date.now();
//     setCurriculum((c) => [...c, { id, title: `Section mới #${c.length + 1}`, lessons: [] }]);
//   };
//   const removeSection = (sid) => {
//     setCurriculum((c) => c.filter((s) => s.id !== sid));
//   };
//   const addLesson = (sid) => {
//     setCurriculum((c) =>
//       c.map((s) =>
//         s.id === sid
//           ? { ...s, lessons: [...s.lessons, { id: Date.now(), title: "Bài học mới", type: "video", duration: "00:00" }] }
//           : s
//       )
//     );
//   };
//   const removeLesson = (sid, lid) => {
//     setCurriculum((c) =>
//       c.map((s) => (s.id === sid ? { ...s, lessons: s.lessons.filter((l) => l.id !== lid) } : s))
//     );
//   };
//   const moveSection = (sid, dir) => {
//     setCurriculum((arr) => {
//       const i = arr.findIndex((x) => x.id === sid);
//       const j = dir === "up" ? i - 1 : i + 1;
//       if (i < 0 || j < 0 || j >= arr.length) return arr;
//       const next = [...arr];
//       [next[i], next[j]] = [next[j], next[i]];
//       return next;
//     });
//   };

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-white">
//       <Header />

//       {/* Hero */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">🆕 Tạo khoá học (Draft)</h1>
//             <p className="text-gray-600">
//               Điền thông tin cơ bản, xây dựng nội dung và cấu hình SEO. Bản nháp sẽ không hiển thị công khai.
//             </p>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             {savedAt ? (
//               <>
//                 <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                 Đã lưu lúc {savedAt.toLocaleTimeString()}
//               </>
//             ) : (
//               <>
//                 <Info className="w-4 h-4" />
//                 Chưa lưu
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Main */}
//       <main className="w-full px-6 lg:px-12 py-8">
//         {/* Wizard header */}
//         <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
//           {[
//             { id: 1, label: "Thông tin cơ bản" },
//             { id: 2, label: "Nội dung & Giá" },
//             { id: 3, label: "Cài đặt & SEO" },
//           ].map((s) => (
//             <button
//               key={s.id}
//               onClick={() => setStep(s.id)}
//               className={`px-3 py-1.5 rounded-full border ${
//                 step === s.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {s.id}. {s.label}
//             </button>
//           ))}
//           <span className="ml-auto inline-flex items-center gap-2">
//             <Link
//               to="/i/courses"
//               className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
//             >
//               <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
//             </Link>
//           </span>
//         </div>

//         {/* Layout: form | preview */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
//           {/* LEFT: form */}
//           <section className="space-y-8">
//             {/* Step 1 */}
//             {step === 1 && (
//               <div className="rounded-2xl border bg-white p-6 space-y-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">1) Thông tin cơ bản</h2>
//                   <p className="text-sm text-gray-600">Tiêu đề, mô tả ngắn, danh mục, cấp độ và ngôn ngữ.</p>
//                 </div>

//                 <div className="grid gap-4">
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">Tiêu đề khoá học *</span>
//                     <input
//                       value={basic.title}
//                       onChange={(e) => setBasic((b) => ({ ...b, title: e.target.value }))}
//                       placeholder="VD: React 18 Pro — Hooks, Router, Performance"
//                       className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
//                         errors.title ? "border-rose-300 focus:ring-rose-200" : "border-gray-300 focus:ring-blue-200"
//                       }`}
//                     />
//                     {errors.title && <span className="text-xs text-rose-600">{errors.title}</span>}
//                   </label>

//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">Mô tả ngắn</span>
//                     <textarea
//                       value={basic.subtitle}
//                       onChange={(e) => setBasic((b) => ({ ...b, subtitle: e.target.value }))}
//                       rows={3}
//                       placeholder="Tóm tắt giá trị, kiến thức học viên đạt được..."
//                       className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
//                         errors.subtitle ? "border-rose-300 focus:ring-rose-200" : "border-gray-300 focus:ring-blue-200"
//                       }`}
//                     />
//                     {errors.subtitle && <span className="text-xs text-rose-600">{errors.subtitle}</span>}
//                   </label>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">Danh mục</span>
//                       <select
//                         value={basic.category}
//                         onChange={(e) => setBasic((b) => ({ ...b, category: e.target.value }))}
//                         className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
//                       >
//                         {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
//                       </select>
//                     </label>
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">Cấp độ</span>
//                       <select
//                         value={basic.level}
//                         onChange={(e) => setBasic((b) => ({ ...b, level: e.target.value }))}
//                         className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
//                       >
//                         {LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
//                       </select>
//                     </label>
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">Ngôn ngữ</span>
//                       <select
//                         value={basic.lang}
//                         onChange={(e) => setBasic((b) => ({ ...b, lang: e.target.value }))}
//                         className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
//                       >
//                         {LANGUAGES.map((c) => <option key={c} value={c}>{c}</option>)}
//                       </select>
//                     </label>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-3">
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">Ảnh thumbnail (URL demo)</span>
//                       <input
//                         value={basic.thumbnail}
//                         onChange={(e) => setBasic((b) => ({ ...b, thumbnail: e.target.value }))}
//                         placeholder="https://..."
//                         className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                       />
//                     </label>
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">Slug (tự tạo)</span>
//                       <div className="flex rounded-xl border border-gray-300 overflow-hidden">
//                         <span className="px-3 bg-gray-50 text-gray-600 text-sm inline-flex items-center"><Hash className="w-4 h-4 mr-1" />/courses/</span>
//                         <input
//                           value={slug}
//                           onChange={(e) => setSlug(slugify(e.target.value))}
//                           className="flex-1 px-3 outline-none text-sm"
//                           placeholder="react-18-pro"
//                         />
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Outcomes & Requirements */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="rounded-xl border p-4">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
//                       <Star className="w-4 h-4 text-amber-600" /> Mục tiêu đạt được *
//                     </div>
//                     <ul className="space-y-2">
//                       {outcomes.map((o, i) => (
//                         <li key={i} className="flex items-center gap-2">
//                           <input
//                             value={o}
//                             onChange={(e) => setOutcomes((arr) => arr.map((x, idx) => (idx === i ? e.target.value : x)))}
//                             className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                           />
//                           <button onClick={() => setOutcomes((arr) => arr.filter((_, idx) => idx !== i))} className="rounded-lg border px-2 py-2 hover:bg-gray-50">
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() => setOutcomes((arr) => [...arr, ""])}
//                       className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
//                     >
//                       <Plus className="w-4 h-4" /> Thêm mục tiêu
//                     </button>
//                     {errors.outcomes && <p className="text-xs mt-2 text-rose-600">{errors.outcomes}</p>}
//                   </div>

//                   <div className="rounded-xl border p-4">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
//                       <Info className="w-4 h-4 text-blue-600" /> Yêu cầu đầu vào
//                     </div>
//                     <ul className="space-y-2">
//                       {requirements.map((r, i) => (
//                         <li key={i} className="flex items-center gap-2">
//                           <input
//                             value={r}
//                             onChange={(e) => setRequirements((arr) => arr.map((x, idx) => (idx === i ? e.target.value : x)))}
//                             className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                           />
//                           <button onClick={() => setRequirements((arr) => arr.filter((_, idx) => idx !== i))} className="rounded-lg border px-2 py-2 hover:bg-gray-50">
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() => setRequirements((arr) => [...arr, ""])}
//                       className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
//                     >
//                       <Plus className="w-4 h-4" /> Thêm yêu cầu
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 */}
//             {step === 2 && (
//               <div className="rounded-2xl border bg-white p-6 space-y-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">2) Nội dung & Giá</h2>
//                   <p className="text-sm text-gray-600">Xây dựng section/bài học và thiết lập giá bán.</p>
//                 </div>

//                 {/* Curriculum */}
//                 <div className="rounded-xl border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
//                       <Layers className="w-4 h-4 text-indigo-600" /> Curriculum *
//                     </div>
//                     <button onClick={addSection} className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50 inline-flex items-center gap-2">
//                       <Plus className="w-4 h-4" /> Thêm section
//                     </button>
//                   </div>

//                   <div className="mt-3 space-y-3">
//                     {curriculum.map((s, idx) => (
//                       <div key={s.id} className="rounded-lg border">
//                         <div className="p-3 flex items-center gap-3">
//                           <GripVertical className="w-4 h-4 text-gray-400" />
//                           <input
//                             value={s.title}
//                             onChange={(e) =>
//                               setCurriculum((arr) =>
//                                 arr.map((x) => (x.id === s.id ? { ...x, title: e.target.value } : x))
//                               )
//                             }
//                             className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                           />
//                           <button onClick={() => moveSection(s.id, "up")} className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50">↑</button>
//                           <button onClick={() => moveSection(s.id, "down")} className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50">↓</button>
//                           <button onClick={() => removeSection(s.id)} className="rounded-lg border px-2 py-1.5 hover:bg-gray-50">
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </div>

//                         {/* Lessons */}
//                         <div className="px-3 pb-3 space-y-2">
//                           {s.lessons.map((l) => (
//                             <div key={l.id} className="rounded-lg border p-3 grid gap-2 md:grid-cols-[1fr_140px_120px_auto] md:items-center">
//                               <input
//                                 value={l.title}
//                                 onChange={(e) =>
//                                   setCurriculum((arr) =>
//                                     arr.map((sec) =>
//                                       sec.id === s.id
//                                         ? {
//                                             ...sec,
//                                             lessons: sec.lessons.map((it) =>
//                                               it.id === l.id ? { ...it, title: e.target.value } : it
//                                             ),
//                                           }
//                                         : sec
//                                     )
//                                   )
//                                 }
//                                 className="rounded-lg border px-3 py-2 text-sm"
//                               />
//                               <select
//                                 value={l.type}
//                                 onChange={(e) =>
//                                   setCurriculum((arr) =>
//                                     arr.map((sec) =>
//                                       sec.id === s.id
//                                         ? {
//                                             ...sec,
//                                             lessons: sec.lessons.map((it) =>
//                                               it.id === l.id ? { ...it, type: e.target.value } : it
//                                             ),
//                                           }
//                                         : sec
//                                     )
//                                   )
//                                 }
//                                 className="rounded-lg border px-3 py-2 text-sm"
//                               >
//                                 <option value="video">Video</option>
//                                 <option value="reading">Reading</option>
//                                 <option value="quiz">Quiz</option>
//                               </select>
//                               <input
//                                 value={l.duration}
//                                 onChange={(e) =>
//                                   setCurriculum((arr) =>
//                                     arr.map((sec) =>
//                                       sec.id === s.id
//                                         ? {
//                                             ...sec,
//                                             lessons: sec.lessons.map((it) =>
//                                               it.id === l.id ? { ...it, duration: e.target.value } : it
//                                             ),
//                                           }
//                                         : sec
//                                     )
//                                   )
//                                 }
//                                 placeholder="mm:ss"
//                                 className="rounded-lg border px-3 py-2 text-sm"
//                               />
//                               <div className="flex items-center justify-end">
//                                 <button
//                                   onClick={() => removeLesson(s.id, l.id)}
//                                   className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2"
//                                 >
//                                   <Trash2 className="w-4 h-4 text-rose-600" /> Xoá
//                                 </button>
//                               </div>
//                             </div>
//                           ))}

//                           <button
//                             onClick={() => addLesson(s.id)}
//                             className="text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
//                           >
//                             <Plus className="w-4 h-4" /> Thêm bài học
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {errors.curriculum && <p className="text-xs mt-2 text-rose-600">{errors.curriculum}</p>}
//                 </div>

//                 {/* Pricing */}
//                 <div className="rounded-xl border p-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
//                       <DollarSign className="w-4 h-4" /> Giá bán (VND)
//                     </span>
//                     <input
//                       type="number"
//                       value={pricing.price}
//                       onChange={(e) => setPricing((p) => ({ ...p, price: Math.max(0, +e.target.value || 0) }))}
//                       className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                     />
//                   </label>
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">Giảm giá (%)</span>
//                     <input
//                       type="number"
//                       value={pricing.discount}
//                       onChange={(e) =>
//                         setPricing((p) => ({ ...p, discount: Math.min(90, Math.max(0, +e.target.value || 0)) }))
//                       }
//                       className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                     />
//                   </label>
//                   <div className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">Giá sau giảm</span>
//                     <div className="rounded-xl border px-4 py-2 text-gray-900 bg-gray-50">{money(finalPrice)}</div>
//                     <div className="text-xs text-gray-600">Ước tính doanh thu (100 HV, net 85%): <b>{money(estRevenue)}</b></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3 */}
//             {step === 3 && (
//               <div className="rounded-2xl border bg-white p-6 space-y-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">3) Cài đặt & SEO</h2>
//                   <p className="text-sm text-gray-600">Từ khoá, mô tả ngắn SEO, quyền hiển thị & review.</p>
//                 </div>

//                 <div className="grid gap-4">
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
//                       <Tag className="w-4 h-4" /> Từ khoá (nhấn Enter để thêm)
//                     </span>
//                     <TagInput value={seo.keywords} onChange={(kws) => setSeo((x) => ({ ...x, keywords: kws }))} />
//                   </label>

//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">Mô tả SEO (tối đa 160 ký tự)</span>
//                     <textarea
//                       value={seo.shortDesc}
//                       onChange={(e) => setSeo((x) => ({ ...x, shortDesc: e.target.value.slice(0, 160) }))}
//                       rows={3}
//                       placeholder="Mô tả xuất hiện trên công cụ tìm kiếm…"
//                       className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                     />
//                     <span className="text-xs text-gray-500">{seo.shortDesc.length} / 160</span>
//                   </label>

//                   <div className="flex flex-wrap items-center gap-4">
//                     <label className="text-sm text-gray-700 inline-flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={seo.isPublic}
//                         onChange={(e) => setSeo((x) => ({ ...x, isPublic: e.target.checked }))}
//                       />
//                       Public (hiển thị trên marketplace)
//                     </label>
//                     <label className="text-sm text-gray-700 inline-flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={seo.allowReviews}
//                         onChange={(e) => setSeo((x) => ({ ...x, allowReviews: e.target.checked }))}
//                       />
//                       Cho phép đánh giá
//                     </label>
//                   </div>

//                   {!canPublish && (
//                     <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 inline-flex items-start gap-2">
//                       <AlertTriangle className="w-4 h-4 mt-0.5" />
//                       <div>
//                         Cần hoàn thiện thông tin bắt buộc trước khi publish:
//                         <ul className="list-disc ml-5">
//                           {errors.title && <li>Tiêu đề khoá học</li>}
//                           {errors.outcomes && <li>Mục tiêu đạt được</li>}
//                           {errors.curriculum && <li>Curriculum (ít nhất 1 section)</li>}
//                         </ul>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Wizard nav */}
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={prev}
//                 disabled={step === 1}
//                 className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
//                   step === 1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"
//                 }`}
//               >
//                 <ArrowLeft className="w-4 h-4" /> Trước
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={saveDraft}
//                   className="rounded-xl border px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 hover:bg-gray-50"
//                 >
//                   <Save className="w-4 h-4" /> Lưu nháp
//                 </button>
//                 <button
//                   onClick={publishDraft}
//                   className={`rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 ${
//                     canPublish ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   <Rocket className="w-4 h-4" /> Publish
//                 </button>
//                 <button
//                   onClick={next}
//                   disabled={step === 3}
//                   className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
//                     step === 3 ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"
//                   }`}
//                 >
//                   Tiếp <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* RIGHT: preview */}
//           <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
//             <div className="rounded-2xl border bg-white overflow-hidden">
//               <div className="aspect-video bg-gray-100 grid place-items-center text-gray-500">
//                 {basic.thumbnail ? (
//                   // eslint-disable-next-line @next/next/no-img-element
//                   <img src={basic.thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="inline-flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5" /> Thumbnail Preview
//                   </span>
//                 )}
//               </div>
//               <div className="p-5">
//                 <div className="text-xs text-gray-600 mb-1">{basic.category} • {basic.level} • <Globe2 className="inline w-3.5 h-3.5 mr-1" />{basic.lang}</div>
//                 <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
//                   {basic.title || "Tiêu đề khoá học"}
//                 </h3>
//                 <p className="text-sm text-gray-700 mt-1 line-clamp-3">
//                   {basic.subtitle || "Mô tả ngắn sẽ hiển thị ở đây..."}
//                 </p>
//                 <div className="mt-3 text-sm text-gray-700 flex flex-wrap items-center gap-3">
//                   <span className="inline-flex items-center gap-1"><Users className="w-4 h-4" /> 0 HV</span>
//                   <span className="inline-flex items-center gap-1"><Timer className="w-4 h-4" /> ~ {curriculum.reduce((s, sec) => s + sec.lessons.length, 0)} bài</span>
//                   <span className="inline-flex items-center gap-1"><DollarSign className="w-4 h-4" /> {money(finalPrice)}</span>
//                 </div>

//                 {seo.keywords.length > 0 && (
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {seo.keywords.slice(0, 6).map((k) => (
//                       <span key={k} className="text-xs px-2 py-1 rounded-full border">@{k}</span>
//                     ))}
//                   </div>
//                 )}

//                 <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//                   <button className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
//                     <Eye className="w-4 h-4" /> Xem trang public
//                   </button>
//                   <Link to="/i/courses" className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
//                     <BookOpen className="w-4 h-4" /> Về danh sách
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-2xl border bg-white p-5">
//               <h4 className="text-sm font-bold text-gray-900">Checklist xuất bản</h4>
//               <ul className="mt-2 text-sm space-y-1">
//                 <li className={`inline-flex items-center gap-2 ${basic.title ? "text-emerald-700" : "text-gray-700"}`}>
//                   <CheckCircle2 className="w-4 h-4" /> Tiêu đề khoá
//                 </li>
//                 <li className={`inline-flex items-center gap-2 ${outcomes.length ? "text-emerald-700" : "text-gray-700"}`}>
//                   <CheckCircle2 className="w-4 h-4" /> Ít nhất 1 mục tiêu
//                 </li>
//                 <li className={`inline-flex items-center gap-2 ${curriculum.length ? "text-emerald-700" : "text-gray-700"}`}>
//                   <CheckCircle2 className="w-4 h-4" /> Có section/lesson
//                 </li>
//                 <li className="inline-flex items-center gap-2 text-gray-700">
//                   <CheckCircle2 className="w-4 h-4" /> Ảnh thumbnail (khuyến nghị)
//                 </li>
//               </ul>
//             </div>
//           </aside>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// /* ===== Tag input (chips) ===== */
// function TagInput({ value = [], onChange }) {
//   const [text, setText] = useState("");

//   const add = (v) => {
//     const k = v.trim().toLowerCase();
//     if (!k) return;
//     if (value.includes(k)) return setText("");
//     onChange([...value, k]);
//     setText("");
//   };

//   return (
//     <div className="rounded-xl border border-gray-300 px-3 py-2">
//       <div className="flex flex-wrap gap-2">
//         {value.map((k) => (
//           <span key={k} className="text-xs px-2 py-1 rounded-full border inline-flex items-center gap-2">
//             #{k}
//             <button
//               onClick={() => onChange(value.filter((x) => x !== k))}
//               className="rounded border px-1 hover:bg-gray-50"
//               title="Xoá"
//             >
//               ×
//             </button>
//           </span>
//         ))}
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               add(text);
//             }
//           }}
//           placeholder="Nhập từ khoá rồi Enter…"
//           className="min-w-[160px] flex-1 outline-none text-sm"
//         />
//       </div>
//     </div>
//   );
// }















































// // src/pages/instructor/CourseNew.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   Save, Rocket, Eye, Image as ImageIcon, Tag, Hash, Timer, Users, DollarSign, Star,
//   CheckCircle2, Plus, Trash2, GripVertical, Sparkles, Globe2, BookOpen, Layers,
//   ArrowLeft, ArrowRight, AlertTriangle, Info
// } from "lucide-react";
// import { authHeader, requireAuth } from "../../utils/auth";

// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102/api";

// /* ===== Helpers ===== */
// const nf = new Intl.NumberFormat("vi-VN");
// const money = (v) => nf.format(v) + "đ";
// const slugify = (s) =>
//   s
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");

// const LEVELS = ["Beginner", "Intermediate", "Advanced", "All levels"];
// const CATEGORIES = [
//   "Frontend Web", "Backend", "Fullstack", "Mobile", "Data/AI", "Database", "DevOps", "Cloud"
// ];
// const LANGUAGES = ["Vietnamese", "English", "Japanese"];

// /* ===== Page ===== */
// export default function CourseNew() {
//   const navigate = useNavigate();

//   // yêu cầu phải đăng nhập
//   useEffect(() => {
//     requireAuth(navigate);
//   }, [navigate]);

//   // wizard steps
//   const [step, setStep] = useState(1); // 1=Basic, 2=Content&Pricing, 3=Settings&SEO
//   const next = () => setStep((s) => Math.min(3, s + 1));
//   const prev = () => setStep((s) => Math.max(1, s - 1));

//   // autosave demo
//   const [savedAt, setSavedAt] = useState(null);
//   useEffect(() => window.scrollTo(0, 0), []);

//   // form state
//   const [basic, setBasic] = useState({
//     title: "",
//     subtitle: "",
//     category: "Frontend Web", // tạm dùng làm categoryId (chuỗi)
//     level: "Beginner",
//     lang: "Vietnamese",
//     thumbnail: "", // URL demo
//   });
//   const [slug, setSlug] = useState("");

//   const [curriculum, setCurriculum] = useState([
//     {
//       id: 1,
//       title: "Giới thiệu khoá học",
//       lessons: [
//         { id: 11, title: "Chào mừng & mục tiêu", type: "video", duration: "03:20" },
//       ],
//     },
//   ]);

//   const [outcomes, setOutcomes] = useState([
//     "Nắm được mục tiêu khoá",
//     "Thiết lập môi trường",
//   ]);
//   const [requirements, setRequirements] = useState([
//     "Máy tính kết nối internet",
//   ]);

//   const [pricing, setPricing] = useState({
//     price: 990000,
//     discount: 0, // %
//   });

//   const [seo, setSeo] = useState({
//     keywords: ["react", "frontend"],
//     shortDesc: "",
//     isPublic: false,
//     allowReviews: true,
//   });

//   const [submitting, setSubmitting] = useState(false);

//   // derived
//   useEffect(() => {
//     if (!basic.title) return setSlug("");
//     setSlug(slugify(basic.title));
//   }, [basic.title]);

//   const finalPrice = Math.max(
//     0,
//     pricing.price - Math.floor((pricing.price * pricing.discount) / 100)
//   );
//   const estRevenue = useMemo(() => {
//     // demo ước tính: 100 enrolls * net(85%) * finalPrice
//     const enrolls = 100;
//     const net = 0.85;
//     return Math.round(enrolls * net * finalPrice);
//   }, [finalPrice]);

//   // validation
//   const errors = useMemo(() => {
//     const e = {};
//     if (!basic.title.trim()) e.title = "Vui lòng nhập tiêu đề khoá học";
//     if (basic.title.length > 100) e.title = "Tiêu đề tối đa 100 ký tự";
//     if (basic.subtitle.length > 160)
//       e.subtitle = "Mô tả ngắn tối đa 160 ký tự";
//     if (!outcomes.length)
//       e.outcomes = "Thêm ít nhất 1 mục tiêu đạt được";
//     if (!curriculum.length)
//       e.curriculum = "Thêm ít nhất 1 section";
//     return e;
//   }, [basic.title, basic.subtitle, outcomes.length, curriculum.length]);

//   const canPublish =
//     Object.keys(errors).length === 0 && finalPrice >= 0 && !submitting;

//   // autosave (demo): khi state thay đổi, sau 1.2s thì "lưu"
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setSavedAt(new Date());
//       // có thể POST bản nháp ở đây nếu backend hỗ trợ
//     }, 1200);
//     return () => clearTimeout(t);
//   }, [basic, slug, outcomes, requirements, curriculum, pricing, seo]);

//   const saveDraft = () => {
//     alert("Lưu nháp hiện vẫn là demo (chưa gọi API riêng cho draft).");
//   };

//   // build payload cho API /api/courses
//   // const buildPayload = () => ({
//   //   title: basic.title.trim(),
//   //   description: basic.subtitle.trim(),
//   //   // nếu backend yêu cầu categoryId thực (Guid / Id DB),
//   //   // bạn hãy map basic.category -> id tương ứng ở đây
//   //   categoryId: basic.category,
//   //   price: pricing.price,
//   //   // tuỳ backend hiểu discountPrice là gì:
//   //   // ở đây mình gửi GIÁ SAU GIẢM
//   //   discountPrice:
//   //     pricing.discount > 0 ? finalPrice : pricing.price,
//   //   thumbnailUrl: basic.thumbnail || "",
//   //   introduce:
//   //     seo.shortDesc || basic.subtitle || basic.title || "",
//   // });
//   const buildPayload = () => ({
//     title: basic.title.trim(),
//     description: basic.subtitle.trim(),
//     // nếu backend yêu cầu categoryId thực (Guid / Id DB),
//     // bạn hãy map basic.category -> id tương ứng ở đây
//     categoryId: basic.category,
//     price: pricing.price,          // giá gốc
//     discountPrice: pricing.discount, // ✅ % giảm giá (0–100)
//     thumbnailUrl: basic.thumbnail || "",
//     introduce:
//       seo.shortDesc || basic.subtitle || basic.title || "",
//   });

//   const publishDraft = async () => {
//     if (!canPublish) {
//       alert("Vui lòng hoàn thiện các mục bắt buộc trước khi publish.");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const payload = buildPayload();

//       const res = await fetch(`${API_BASE}/courses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...authHeader(),
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         let msg = `Publish thất bại (HTTP ${res.status})`;
//         try {
//           const txt = await res.text();
//           if (txt) {
//             try {
//               const j = JSON.parse(txt);
//               msg = j.message || j.error || txt || msg;
//             } catch {
//               msg = txt || msg;
//             }
//           }
//         } catch {}
//         alert(msg);
//         return;
//       }

//       const data = await res.json().catch(() => null);
//       console.log("Created course:", data);
//       alert("Tạo khoá học thành công!");
//       navigate("/i/courses");
//     } catch (err) {
//       console.error(err);
//       alert(
//         err?.message ||
//           "Không thể tạo khoá học. Kiểm tra lại API /api/courses."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // curriculum helpers
//   const addSection = () => {
//     const id = Date.now();
//     setCurriculum((c) => [
//       ...c,
//       {
//         id,
//         title: `Section mới #${c.length + 1}`,
//         lessons: [],
//       },
//     ]);
//   };
//   const removeSection = (sid) => {
//     setCurriculum((c) => c.filter((s) => s.id !== sid));
//   };
//   const addLesson = (sid) => {
//     setCurriculum((c) =>
//       c.map((s) =>
//         s.id === sid
//           ? {
//               ...s,
//               lessons: [
//                 ...s.lessons,
//                 {
//                   id: Date.now(),
//                   title: "Bài học mới",
//                   type: "video",
//                   duration: "00:00",
//                 },
//               ],
//             }
//           : s
//       )
//     );
//   };
//   const removeLesson = (sid, lid) => {
//     setCurriculum((c) =>
//       c.map((s) =>
//         s.id === sid
//           ? {
//               ...s,
//               lessons: s.lessons.filter((l) => l.id !== lid),
//             }
//           : s
//       )
//     );
//   };
//   const moveSection = (sid, dir) => {
//     setCurriculum((arr) => {
//       const i = arr.findIndex((x) => x.id === sid);
//       const j = dir === "up" ? i - 1 : i + 1;
//       if (i < 0 || j < 0 || j >= arr.length) return arr;
//       const next = [...arr];
//       [next[i], next[j]] = [next[j], next[i]];
//       return next;
//     });
//   };

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-white">
//       <Header />

//       {/* Hero */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
//               🆕 Tạo khoá học
//             </h1>
//             <p className="text-gray-600">
//               Điền thông tin cơ bản, xây dựng nội dung và xuất bản khoá học.
//             </p>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             {savedAt ? (
//               <>
//                 <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                 Đã lưu lúc {savedAt.toLocaleTimeString()}
//               </>
//             ) : (
//               <>
//                 <Info className="w-4 h-4" />
//                 Chưa lưu
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Main */}
//       <main className="w-full px-6 lg:px-12 py-8">
//         {/* Wizard header */}
//         <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
//           {[
//             { id: 1, label: "Thông tin cơ bản" },
//             { id: 2, label: "Nội dung & Giá" },
//             { id: 3, label: "Cài đặt & SEO" },
//           ].map((s) => (
//             <button
//               key={s.id}
//               onClick={() => setStep(s.id)}
//               className={`px-3 py-1.5 rounded-full border ${
//                 step === s.id
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {s.id}. {s.label}
//             </button>
//           ))}
//           <span className="ml-auto inline-flex items-center gap-2">
//             <Link
//               to="/i/courses"
//               className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
//             >
//               <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
//             </Link>
//           </span>
//         </div>

//         {/* Layout: form | preview */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
//           {/* LEFT: form */}
//           <section className="space-y-8">
//             {/* Step 1 */}
//             {step === 1 && (
//               <div className="rounded-2xl border bg-white p-6 space-y-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">
//                     1) Thông tin cơ bản
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     Tiêu đề, mô tả ngắn, danh mục, cấp độ và ngôn ngữ.
//                   </p>
//                 </div>

//                 <div className="grid gap-4">
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">
//                       Tiêu đề khoá học *
//                     </span>
//                     <input
//                       value={basic.title}
//                       onChange={(e) =>
//                         setBasic((b) => ({ ...b, title: e.target.value }))
//                       }
//                       placeholder="VD: React 18 Pro — Hooks, Router, Performance"
//                       className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
//                         errors.title
//                           ? "border-rose-300 focus:ring-rose-200"
//                           : "border-gray-300 focus:ring-blue-200"
//                       }`}
//                     />
//                     {errors.title && (
//                       <span className="text-xs text-rose-600">
//                         {errors.title}
//                       </span>
//                     )}
//                   </label>

//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">
//                       Mô tả ngắn
//                     </span>
//                     <textarea
//                       value={basic.subtitle}
//                       onChange={(e) =>
//                         setBasic((b) => ({
//                           ...b,
//                           subtitle: e.target.value,
//                         }))
//                       }
//                       rows={3}
//                       placeholder="Tóm tắt giá trị, kiến thức học viên đạt được..."
//                       className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
//                         errors.subtitle
//                           ? "border-rose-300 focus:ring-rose-200"
//                           : "border-gray-300 focus:ring-blue-200"
//                       }`}
//                     />
//                     {errors.subtitle && (
//                       <span className="text-xs text-rose-600">
//                         {errors.subtitle}
//                       </span>
//                     )}
//                   </label>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">
//                         Danh mục
//                       </span>
//                       <select
//                         value={basic.category}
//                         onChange={(e) =>
//                           setBasic((b) => ({
//                             ...b,
//                             category: e.target.value,
//                           }))
//                         }
//                         className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
//                       >
//                         {CATEGORIES.map((c) => (
//                           <option key={c} value={c}>
//                             {c}
//                           </option>
//                         ))}
//                       </select>
//                     </label>
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">
//                         Cấp độ
//                       </span>
//                       <select
//                         value={basic.level}
//                         onChange={(e) =>
//                           setBasic((b) => ({ ...b, level: e.target.value }))
//                         }
//                         className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
//                       >
//                         {LEVELS.map((c) => (
//                           <option key={c} value={c}>
//                             {c}
//                           </option>
//                         ))}
//                       </select>
//                     </label>
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">
//                         Ngôn ngữ
//                       </span>
//                       <select
//                         value={basic.lang}
//                         onChange={(e) =>
//                           setBasic((b) => ({ ...b, lang: e.target.value }))
//                         }
//                         className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
//                       >
//                         {LANGUAGES.map((c) => (
//                           <option key={c} value={c}>
//                             {c}
//                           </option>
//                         ))}
//                       </select>
//                     </label>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-3">
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">
//                         Ảnh thumbnail (URL)
//                       </span>
//                       <input
//                         value={basic.thumbnail}
//                         onChange={(e) =>
//                           setBasic((b) => ({
//                             ...b,
//                             thumbnail: e.target.value,
//                           }))
//                         }
//                         placeholder="https://..."
//                         className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                       />
//                     </label>
//                     <label className="grid gap-1">
//                       <span className="text-sm font-medium text-gray-800">
//                         Slug (tự tạo)
//                       </span>
//                       <div className="flex rounded-xl border border-gray-300 overflow-hidden">
//                         <span className="px-3 bg-gray-50 text-gray-600 text-sm inline-flex items-center">
//                           <Hash className="w-4 h-4 mr-1" />
//                           /courses/
//                         </span>
//                         <input
//                           value={slug}
//                           onChange={(e) => setSlug(slugify(e.target.value))}
//                           className="flex-1 px-3 outline-none text-sm"
//                           placeholder="react-18-pro"
//                         />
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Outcomes & Requirements */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="rounded-xl border p-4">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
//                       <Star className="w-4 h-4 text-amber-600" /> Mục tiêu
//                       đạt được *
//                     </div>
//                     <ul className="space-y-2">
//                       {outcomes.map((o, i) => (
//                         <li
//                           key={i}
//                           className="flex items-center gap-2"
//                         >
//                           <input
//                             value={o}
//                             onChange={(e) =>
//                               setOutcomes((arr) =>
//                                 arr.map((x, idx) =>
//                                   idx === i ? e.target.value : x
//                                 )
//                               )
//                             }
//                             className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                           />
//                           <button
//                             onClick={() =>
//                               setOutcomes((arr) =>
//                                 arr.filter((_, idx) => idx !== i)
//                               )
//                             }
//                             className="rounded-lg border px-2 py-2 hover:bg-gray-50"
//                           >
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() =>
//                         setOutcomes((arr) => [...arr, ""])
//                       }
//                       className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
//                     >
//                       <Plus className="w-4 h-4" /> Thêm mục tiêu
//                     </button>
//                     {errors.outcomes && (
//                       <p className="text-xs mt-2 text-rose-600">
//                         {errors.outcomes}
//                       </p>
//                     )}
//                   </div>

//                   <div className="rounded-xl border p-4">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
//                       <Info className="w-4 h-4 text-blue-600" /> Yêu cầu đầu
//                       vào
//                     </div>
//                     <ul className="space-y-2">
//                       {requirements.map((r, i) => (
//                         <li
//                           key={i}
//                           className="flex items-center gap-2"
//                         >
//                           <input
//                             value={r}
//                             onChange={(e) =>
//                               setRequirements((arr) =>
//                                 arr.map((x, idx) =>
//                                   idx === i ? e.target.value : x
//                                 )
//                               )
//                             }
//                             className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                           />
//                           <button
//                             onClick={() =>
//                               setRequirements((arr) =>
//                                 arr.filter((_, idx) => idx !== i)
//                               )
//                             }
//                             className="rounded-lg border px-2 py-2 hover:bg-gray-50"
//                           >
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                     <button
//                       onClick={() =>
//                         setRequirements((arr) => [...arr, ""])
//                       }
//                       className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
//                     >
//                       <Plus className="w-4 h-4" /> Thêm yêu cầu
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 */}
//             {step === 2 && (
//               <div className="rounded-2xl border bg-white p-6 space-y-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">
//                     2) Nội dung & Giá
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     Xây dựng section/bài học và thiết lập giá bán.
//                   </p>
//                 </div>

//                 {/* Curriculum */}
//                 <div className="rounded-xl border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
//                       <Layers className="w-4 h-4 text-indigo-600" /> Curriculum
//                       *
//                     </div>
//                     <button
//                       onClick={addSection}
//                       className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50 inline-flex items-center gap-2"
//                     >
//                       <Plus className="w-4 h-4" /> Thêm section
//                     </button>
//                   </div>

//                   <div className="mt-3 space-y-3">
//                     {curriculum.map((s) => (
//                       <div key={s.id} className="rounded-lg border">
//                         <div className="p-3 flex items-center gap-3">
//                           <GripVertical className="w-4 h-4 text-gray-400" />
//                           <input
//                             value={s.title}
//                             onChange={(e) =>
//                               setCurriculum((arr) =>
//                                 arr.map((x) =>
//                                   x.id === s.id
//                                     ? { ...x, title: e.target.value }
//                                     : x
//                                 )
//                               )
//                             }
//                             className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                           />
//                           <button
//                             onClick={() => moveSection(s.id, "up")}
//                             className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50"
//                           >
//                             ↑
//                           </button>
//                           <button
//                             onClick={() => moveSection(s.id, "down")}
//                             className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50"
//                           >
//                             ↓
//                           </button>
//                           <button
//                             onClick={() => removeSection(s.id)}
//                             className="rounded-lg border px-2 py-1.5 hover:bg-gray-50"
//                           >
//                             <Trash2 className="w-4 h-4 text-rose-600" />
//                           </button>
//                         </div>

//                         {/* Lessons */}
//                         <div className="px-3 pb-3 space-y-2">
//                           {s.lessons.map((l) => (
//                             <div
//                               key={l.id}
//                               className="rounded-lg border p-3 grid gap-2 md:grid-cols-[1fr_140px_120px_auto] md:items-center"
//                             >
//                               <input
//                                 value={l.title}
//                                 onChange={(e) =>
//                                   setCurriculum((arr) =>
//                                     arr.map((sec) =>
//                                       sec.id === s.id
//                                         ? {
//                                             ...sec,
//                                             lessons: sec.lessons.map(
//                                               (it) =>
//                                                 it.id === l.id
//                                                   ? {
//                                                       ...it,
//                                                       title:
//                                                         e.target.value,
//                                                     }
//                                                   : it
//                                             ),
//                                           }
//                                         : sec
//                                     )
//                                   )
//                                 }
//                                 className="rounded-lg border px-3 py-2 text-sm"
//                               />
//                               <select
//                                 value={l.type}
//                                 onChange={(e) =>
//                                   setCurriculum((arr) =>
//                                     arr.map((sec) =>
//                                       sec.id === s.id
//                                         ? {
//                                             ...sec,
//                                             lessons: sec.lessons.map(
//                                               (it) =>
//                                                 it.id === l.id
//                                                   ? {
//                                                       ...it,
//                                                       type:
//                                                         e.target.value,
//                                                     }
//                                                   : it
//                                             ),
//                                           }
//                                         : sec
//                                     )
//                                   )
//                                 }
//                                 className="rounded-lg border px-3 py-2 text-sm"
//                               >
//                                 <option value="video">Video</option>
//                                 <option value="reading">Reading</option>
//                                 <option value="quiz">Quiz</option>
//                               </select>
//                               <input
//                                 value={l.duration}
//                                 onChange={(e) =>
//                                   setCurriculum((arr) =>
//                                     arr.map((sec) =>
//                                       sec.id === s.id
//                                         ? {
//                                             ...sec,
//                                             lessons: sec.lessons.map(
//                                               (it) =>
//                                                 it.id === l.id
//                                                   ? {
//                                                       ...it,
//                                                       duration:
//                                                         e.target.value,
//                                                     }
//                                                   : it
//                                             ),
//                                           }
//                                         : sec
//                                     )
//                                   )
//                                 }
//                                 placeholder="mm:ss"
//                                 className="rounded-lg border px-3 py-2 text-sm"
//                               />
//                               <div className="flex items-center justify-end">
//                                 <button
//                                   onClick={() =>
//                                     removeLesson(s.id, l.id)
//                                   }
//                                   className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2"
//                                 >
//                                   <Trash2 className="w-4 h-4 text-rose-600" />{" "}
//                                   Xoá
//                                 </button>
//                               </div>
//                             </div>
//                           ))}

//                           <button
//                             onClick={() => addLesson(s.id)}
//                             className="text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
//                           >
//                             <Plus className="w-4 h-4" /> Thêm bài học
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {errors.curriculum && (
//                     <p className="text-xs mt-2 text-rose-600">
//                       {errors.curriculum}
//                     </p>
//                   )}
//                 </div>

//                 {/* Pricing */}
//                 <div className="rounded-xl border p-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
//                       <DollarSign className="w-4 h-4" /> Giá bán (VND)
//                     </span>
//                     <input
//                       type="number"
//                       value={pricing.price}
//                       onChange={(e) =>
//                         setPricing((p) => ({
//                           ...p,
//                           price: Math.max(0, +e.target.value || 0),
//                         }))
//                       }
//                       className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                     />
//                   </label>
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">
//                       Giảm giá (%)
//                     </span>
//                     <input
//                       type="number"
//                       value={pricing.discount}
//                       onChange={(e) =>
//                         setPricing((p) => ({
//                           ...p,
//                           discount: Math.min(
//                             90,
//                             Math.max(0, +e.target.value || 0)
//                           ),
//                         }))
//                       }
//                       className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                     />
//                   </label>
//                   <div className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">
//                       Giá sau giảm
//                     </span>
//                     <div className="rounded-xl border px-4 py-2 text-gray-900 bg-gray-50">
//                       {money(finalPrice)}
//                     </div>
//                     <div className="text-xs text-gray-600">
//                       Ước tính doanh thu (100 HV, net 85%):{" "}
//                       <b>{money(estRevenue)}</b>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3 */}
//             {step === 3 && (
//               <div className="rounded-2xl border bg-white p-6 space-y-6">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">
//                     3) Cài đặt & SEO
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     Từ khoá, mô tả ngắn SEO, quyền hiển thị & review.
//                   </p>
//                 </div>

//                 <div className="grid gap-4">
//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
//                       <Tag className="w-4 h-4" /> Từ khoá (nhấn Enter để
//                       thêm)
//                     </span>
//                     <TagInput
//                       value={seo.keywords}
//                       onChange={(kws) =>
//                         setSeo((x) => ({ ...x, keywords: kws }))
//                       }
//                     />
//                   </label>

//                   <label className="grid gap-1">
//                     <span className="text-sm font-medium text-gray-800">
//                       Mô tả SEO (tối đa 160 ký tự)
//                     </span>
//                     <textarea
//                       value={seo.shortDesc}
//                       onChange={(e) =>
//                         setSeo((x) => ({
//                           ...x,
//                           shortDesc: e.target.value.slice(0, 160),
//                         }))
//                       }
//                       rows={3}
//                       placeholder="Mô tả xuất hiện trên công cụ tìm kiếm…"
//                       className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//                     />
//                     <span className="text-xs text-gray-500">
//                       {seo.shortDesc.length} / 160
//                     </span>
//                   </label>

//                   <div className="flex flex-wrap items-center gap-4">
//                     <label className="text-sm text-gray-700 inline-flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={seo.isPublic}
//                         onChange={(e) =>
//                           setSeo((x) => ({
//                             ...x,
//                             isPublic: e.target.checked,
//                           }))
//                         }
//                       />
//                       Public (hiển thị trên marketplace)
//                     </label>
//                     <label className="text-sm text-gray-700 inline-flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={seo.allowReviews}
//                         onChange={(e) =>
//                           setSeo((x) => ({
//                             ...x,
//                             allowReviews: e.target.checked,
//                           }))
//                         }
//                       />
//                       Cho phép đánh giá
//                     </label>
//                   </div>

//                   {!canPublish && (
//                     <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 inline-flex items-start gap-2">
//                       <AlertTriangle className="w-4 h-4 mt-0.5" />
//                       <div>
//                         Cần hoàn thiện thông tin bắt buộc trước khi publish:
//                         <ul className="list-disc ml-5">
//                           {errors.title && <li>Tiêu đề khoá học</li>}
//                           {errors.outcomes && (
//                             <li>Mục tiêu đạt được</li>
//                           )}
//                           {errors.curriculum && (
//                             <li>Curriculum (ít nhất 1 section)</li>
//                           )}
//                         </ul>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Wizard nav */}
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={prev}
//                 disabled={step === 1}
//                 className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
//                   step === 1
//                     ? "text-gray-400 border-gray-200"
//                     : "hover:bg-gray-50"
//                 }`}
//               >
//                 <ArrowLeft className="w-4 h-4" /> Trước
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={saveDraft}
//                   className="rounded-xl border px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 hover:bg-gray-50"
//                 >
//                   <Save className="w-4 h-4" /> Lưu nháp
//                 </button>
//                 <button
//                   onClick={publishDraft}
//                   disabled={!canPublish}
//                   className={`rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 ${
//                     canPublish
//                       ? "bg-blue-600 hover:bg-blue-700 text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   <Rocket className="w-4 h-4" />{" "}
//                   {submitting ? "Đang publish..." : "Publish"}
//                 </button>
//                 <button
//                   onClick={next}
//                   disabled={step === 3}
//                   className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
//                     step === 3
//                       ? "text-gray-400 border-gray-200"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   Tiếp <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* RIGHT: preview */}
//           <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
//             <div className="rounded-2xl border bg-white overflow-hidden">
//               <div className="aspect-video bg-gray-100 grid place-items-center text-gray-500">
//                 {basic.thumbnail ? (
//                   // eslint-disable-next-line jsx-a11y/alt-text
//                   <img
//                     src={basic.thumbnail}
//                     alt="thumbnail"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="inline-flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5" /> Thumbnail Preview
//                   </span>
//                 )}
//               </div>
//               <div className="p-5">
//                 <div className="text-xs text-gray-600 mb-1">
//                   {basic.category} • {basic.level} •{" "}
//                   <Globe2 className="inline w-3.5 h-3.5 mr-1" />
//                   {basic.lang}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
//                   {basic.title || "Tiêu đề khoá học"}
//                 </h3>
//                 <p className="text-sm text-gray-700 mt-1 line-clamp-3">
//                   {basic.subtitle ||
//                     "Mô tả ngắn sẽ hiển thị ở đây..."}
//                 </p>
//                 <div className="mt-3 text-sm text-gray-700 flex flex-wrap items-center gap-3">
//                   <span className="inline-flex items-center gap-1">
//                     <Users className="w-4 h-4" /> 0 HV
//                   </span>
//                   <span className="inline-flex items-center gap-1">
//                     <Timer className="w-4 h-4" /> ~{" "}
//                     {curriculum.reduce(
//                       (s, sec) => s + sec.lessons.length,
//                       0
//                     )}{" "}
//                     bài
//                   </span>
//                   <span className="inline-flex items-center gap-1">
//                     <DollarSign className="w-4 h-4" /> {money(finalPrice)}
//                   </span>
//                 </div>

//                 {seo.keywords.length > 0 && (
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {seo.keywords.slice(0, 6).map((k) => (
//                       <span
//                         key={k}
//                         className="text-xs px-2 py-1 rounded-full border"
//                       >
//                         @{k}
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                 <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//                   <button className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
//                     <Eye className="w-4 h-4" /> Xem trang public
//                   </button>
//                   <Link
//                     to="/i/courses"
//                     className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2"
//                   >
//                     <BookOpen className="w-4 h-4" /> Về danh sách
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-2xl border bg-white p-5">
//               <h4 className="text-sm font-bold text-gray-900">
//                 Checklist xuất bản
//               </h4>
//               <ul className="mt-2 text-sm space-y-1">
//                 <li
//                   className={`inline-flex items-center gap-2 ${
//                     basic.title ? "text-emerald-700" : "text-gray-700"
//                   }`}
//                 >
//                   <CheckCircle2 className="w-4 h-4" /> Tiêu đề khoá
//                 </li>
//                 <li
//                   className={`inline-flex items-center gap-2 ${
//                     outcomes.length ? "text-emerald-700" : "text-gray-700"
//                   }`}
//                 >
//                   <CheckCircle2 className="w-4 h-4" /> Ít nhất 1 mục tiêu
//                 </li>
//                 <li
//                   className={`inline-flex items-center gap-2 ${
//                     curriculum.length ? "text-emerald-700" : "text-gray-700"
//                   }`}
//                 >
//                   <CheckCircle2 className="w-4 h-4" /> Có section/lesson
//                 </li>
//                 <li className="inline-flex items-center gap-2 text-gray-700">
//                   <CheckCircle2 className="w-4 h-4" /> Ảnh thumbnail
//                   (khuyến nghị)
//                 </li>
//               </ul>
//             </div>
//           </aside>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// /* ===== Tag input (chips) ===== */
// function TagInput({ value = [], onChange }) {
//   const [text, setText] = useState("");

//   const add = (v) => {
//     const k = v.trim().toLowerCase();
//     if (!k) return;
//     if (value.includes(k)) return setText("");
//     onChange([...value, k]);
//     setText("");
//   };

//   return (
//     <div className="rounded-xl border border-gray-300 px-3 py-2">
//       <div className="flex flex-wrap gap-2">
//         {value.map((k) => (
//           <span
//             key={k}
//             className="text-xs px-2 py-1 rounded-full border inline-flex items-center gap-2"
//           >
//             #{k}
//             <button
//               onClick={() => onChange(value.filter((x) => x !== k))}
//               className="rounded border px-1 hover:bg-gray-50"
//               title="Xoá"
//             >
//               ×
//             </button>
//           </span>
//         ))}
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               add(text);
//             }
//           }}
//           placeholder="Nhập từ khoá rồi Enter…"
//           className="min-w-[160px] flex-1 outline-none text-sm"
//         />
//       </div>
//     </div>
//   );
// }



































// src/pages/instructor/CourseNew.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Save,
  Rocket,
  Eye,
  Image as ImageIcon,
  Tag,
  Hash,
  Timer,
  Users,
  DollarSign,
  Star,
  CheckCircle2,
  Plus,
  Trash2,
  GripVertical,
  Globe2,
  BookOpen,
  Layers,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
} from "lucide-react";
import { authHeader, requireAuth } from "../../utils/auth";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102/api";

/* ===== Helpers ===== */
const nf = new Intl.NumberFormat("vi-VN");
const money = (v) => nf.format(v) + "đ";
const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const LEVELS = ["Beginner", "Intermediate", "Advanced", "All levels"];
const LANGUAGES = ["Vietnamese", "English", "Japanese"];

/* ===== Page ===== */
export default function CourseNew() {
  const navigate = useNavigate();

  // yêu cầu phải đăng nhập
  useEffect(() => {
    requireAuth(navigate);
  }, [navigate]);

  const [categories, setCategories] = useState([]); // [{id,name,...}]
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [catError, setCatError] = useState("");

  // wizard steps
  const [step, setStep] = useState(1); // 1=Basic, 2=Content&Pricing, 3=Settings&SEO
  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  // autosave demo
  const [savedAt, setSavedAt] = useState(null);
  useEffect(() => window.scrollTo(0, 0), []);

  // form state
  const [basic, setBasic] = useState({
    title: "",
    subtitle: "",
    categoryId: "", // GUID của category
    level: "Beginner",
    lang: "Vietnamese",
    thumbnail: "", // URL demo
  });
  const [slug, setSlug] = useState("");

  const [curriculum, setCurriculum] = useState([
    {
      id: 1,
      title: "Giới thiệu khoá học",
      lessons: [
        { id: 11, title: "Chào mừng & mục tiêu", type: "video", duration: "03:20" },
      ],
    },
  ]);

  const [outcomes, setOutcomes] = useState([
    "Nắm được mục tiêu khoá",
    "Thiết lập môi trường",
  ]);
  const [requirements, setRequirements] = useState([
    "Máy tính kết nối internet",
  ]);

  const [pricing, setPricing] = useState({
    price: 990000,
    discount: 0, // % 0–100
  });

  const [seo, setSeo] = useState({
    keywords: ["react", "frontend"],
    shortDesc: "",
    isPublic: false,
    allowReviews: true,
  });

  const [submitting, setSubmitting] = useState(false);

  /* ===== Load categories từ API ===== */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setCatError("");
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // API trả { status, message, data: [...] }
        const list = Array.isArray(json?.data) ? json.data : [];
        setCategories(list);

        // nếu chưa có categoryId thì chọn cái đầu tiên
        if (!basic.categoryId && list[0]?.id) {
          setBasic((b) => ({ ...b, categoryId: list[0].id }));
        }
      } catch (err) {
        console.error("Load categories failed:", err);
        setCatError("Không tải được danh mục khoá học.");
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // derived
  useEffect(() => {
    if (!basic.title) return setSlug("");
    setSlug(slugify(basic.title));
  }, [basic.title]);

  const finalPrice = useMemo(() => {
    const pct = Math.min(100, Math.max(0, Number(pricing.discount) || 0));
    const base = Math.max(0, Number(pricing.price) || 0);
    return Math.max(0, base - Math.floor((base * pct) / 100));
  }, [pricing.price, pricing.discount]);

  const estRevenue = useMemo(() => {
    const enrolls = 100;
    const net = 0.85;
    return Math.round(enrolls * net * finalPrice);
  }, [finalPrice]);

  const selectedCategoryName = useMemo(
    () =>
      categories.find((c) => c.id === basic.categoryId)?.name || "Chưa chọn",
    [categories, basic.categoryId]
  );

  // validation
  const errors = useMemo(() => {
    const e = {};
    if (!basic.title.trim()) e.title = "Vui lòng nhập tiêu đề khoá học";
    if (basic.title.length > 100) e.title = "Tiêu đề tối đa 100 ký tự";
    if (basic.subtitle.length > 160)
      e.subtitle = "Mô tả ngắn tối đa 160 ký tự";
    if (!outcomes.length)
      e.outcomes = "Thêm ít nhất 1 mục tiêu đạt được";
    if (!curriculum.length)
      e.curriculum = "Thêm ít nhất 1 section";
    if (!basic.categoryId)
      e.categoryId = "Vui lòng chọn danh mục";
    return e;
  }, [
    basic.title,
    basic.subtitle,
    basic.categoryId,
    outcomes.length,
    curriculum.length,
  ]);

  const canPublish =
    Object.keys(errors).length === 0 &&
    finalPrice >= 0 &&
    !submitting &&
    !loadingCategories;

  // autosave (demo): khi state thay đổi, sau 1.2s thì "lưu"
  useEffect(() => {
    const t = setTimeout(() => {
      setSavedAt(new Date());
      // có thể POST bản nháp ở đây nếu backend hỗ trợ
    }, 1200);
    return () => clearTimeout(t);
  }, [basic, slug, outcomes, requirements, curriculum, pricing, seo]);

  const saveDraft = () => {
    alert("Lưu nháp hiện vẫn là demo (chưa gọi API riêng cho draft).");
  };

  /* ===== Build payload cho API /api/courses ===== */
  const buildPayload = () => ({
    title: basic.title.trim(),
    description: basic.subtitle.trim(),
    categoryId: basic.categoryId,                // GUID
    price: Math.max(0, Number(pricing.price) || 0), // giá gốc
    discountPrice: Math.min(                     // % giảm giá 0–100
      100,
      Math.max(0, Number(pricing.discount) || 0)
    ),
    thumbnailUrl: basic.thumbnail || "",
    introduce: seo.shortDesc || basic.subtitle || basic.title || "",
  });

  const publishDraft = async () => {
    if (!canPublish) {
      alert("Vui lòng hoàn thiện các mục bắt buộc trước khi publish.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = buildPayload();

      const res = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Publish thất bại (HTTP ${res.status})`;
        try {
          const txt = await res.text();
          if (txt) {
            try {
              const j = JSON.parse(txt);
              msg = j.message || j.error || txt || msg;
            } catch {
              msg = txt || msg;
            }
          }
        } catch {}
        alert(msg);
        return;
      }

      const data = await res.json().catch(() => null);
      console.log("Created course:", data);
      alert("Tạo khoá học thành công!");
      navigate("/i/courses");
    } catch (err) {
      console.error(err);
      alert(
        err?.message ||
          "Không thể tạo khoá học. Kiểm tra lại API /api/courses."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ===== Curriculum helpers ===== */
  const addSection = () => {
    const id = Date.now();
    setCurriculum((c) => [
      ...c,
      {
        id,
        title: `Section mới #${c.length + 1}`,
        lessons: [],
      },
    ]);
  };
  const removeSection = (sid) => {
    setCurriculum((c) => c.filter((s) => s.id !== sid));
  };
  const addLesson = (sid) => {
    setCurriculum((c) =>
      c.map((s) =>
        s.id === sid
          ? {
              ...s,
              lessons: [
                ...s.lessons,
                {
                  id: Date.now(),
                  title: "Bài học mới",
                  type: "video",
                  duration: "00:00",
                },
              ],
            }
          : s
      )
    );
  };
  const removeLesson = (sid, lid) => {
    setCurriculum((c) =>
      c.map((s) =>
        s.id === sid
          ? {
              ...s,
              lessons: s.lessons.filter((l) => l.id !== lid),
            }
          : s
      )
    );
  };
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

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              🆕 Tạo khoá học
            </h1>
            <p className="text-gray-600">
              Điền thông tin cơ bản, xây dựng nội dung và xuất bản khoá học.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {savedAt ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Đã lưu lúc {savedAt.toLocaleTimeString()}
              </>
            ) : (
              <>
                <Info className="w-4 h-4" />
                Chưa lưu
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="w-full px-6 lg:px-12 py-8">
        {/* Wizard header */}
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
                step === s.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s.id}. {s.label}
            </button>
          ))}
          <span className="ml-auto inline-flex items-center gap-2">
            <Link
              to="/i/courses"
              className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
            </Link>
          </span>
        </div>

        {/* Layout: form | preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* LEFT: form */}
          <section className="space-y-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    1) Thông tin cơ bản
                  </h2>
                  <p className="text-sm text-gray-600">
                    Tiêu đề, mô tả ngắn, danh mục, cấp độ và ngôn ngữ.
                  </p>
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">
                      Tiêu đề khoá học *
                    </span>
                    <input
                      value={basic.title}
                      onChange={(e) =>
                        setBasic((b) => ({ ...b, title: e.target.value }))
                      }
                      placeholder="VD: React 18 Pro — Hooks, Router, Performance"
                      className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
                        errors.title
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-gray-300 focus:ring-blue-200"
                      }`}
                    />
                    {errors.title && (
                      <span className="text-xs text-rose-600">
                        {errors.title}
                      </span>
                    )}
                  </label>

                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">
                      Mô tả ngắn
                    </span>
                    <textarea
                      value={basic.subtitle}
                      onChange={(e) =>
                        setBasic((b) => ({
                          ...b,
                          subtitle: e.target.value,
                        }))
                      }
                      rows={3}
                      placeholder="Tóm tắt giá trị, kiến thức học viên đạt được..."
                      className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 ${
                        errors.subtitle
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-gray-300 focus:ring-blue-200"
                      }`}
                    />
                    {errors.subtitle && (
                      <span className="text-xs text-rose-600">
                        {errors.subtitle}
                      </span>
                    )}
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">
                        Danh mục
                      </span>
                      <select
                        value={basic.categoryId}
                        onChange={(e) =>
                          setBasic((b) => ({
                            ...b,
                            categoryId: e.target.value,
                          }))
                        }
                        disabled={loadingCategories}
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      >
                        {loadingCategories && (
                          <option value="">Đang tải...</option>
                        )}
                        {!loadingCategories &&
                          categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                      {errors.categoryId && (
                        <span className="text-xs text-rose-600">
                          {errors.categoryId}
                        </span>
                      )}
                      {catError && (
                        <span className="text-xs text-rose-600">
                          {catError}
                        </span>
                      )}
                    </label>

                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">
                        Cấp độ
                      </span>
                      <select
                        value={basic.level}
                        onChange={(e) =>
                          setBasic((b) => ({ ...b, level: e.target.value }))
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      >
                        {LEVELS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">
                        Ngôn ngữ
                      </span>
                      <select
                        value={basic.lang}
                        onChange={(e) =>
                          setBasic((b) => ({ ...b, lang: e.target.value }))
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                      >
                        {LANGUAGES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-3">
                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">
                        Ảnh thumbnail (URL)
                      </span>
                      <input
                        value={basic.thumbnail}
                        onChange={(e) =>
                          setBasic((b) => ({
                            ...b,
                            thumbnail: e.target.value,
                          }))
                        }
                        placeholder="https://..."
                        className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-gray-800">
                        Slug (tự tạo)
                      </span>
                      <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                        <span className="px-3 bg-gray-50 text-gray-600 text-sm inline-flex items-center">
                          <Hash className="w-4 h-4 mr-1" />
                          /courses/
                        </span>
                        <input
                          value={slug}
                          onChange={(e) => setSlug(slugify(e.target.value))}
                          className="flex-1 px-3 outline-none text-sm"
                          placeholder="react-18-pro"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Outcomes & Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                      <Star className="w-4 h-4 text-amber-600" /> Mục tiêu
                      đạt được *
                    </div>
                    <ul className="space-y-2">
                      {outcomes.map((o, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <input
                            value={o}
                            onChange={(e) =>
                              setOutcomes((arr) =>
                                arr.map((x, idx) =>
                                  idx === i ? e.target.value : x
                                )
                              )
                            }
                            className="flex-1 rounded-lg border px-3 py-2 text-sm"
                          />
                          <button
                            onClick={() =>
                              setOutcomes((arr) =>
                                arr.filter((_, idx) => idx !== i)
                              )
                            }
                            className="rounded-lg border px-2 py-2 hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4 text-rose-600" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setOutcomes((arr) => [...arr, ""])}
                      className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Thêm mục tiêu
                    </button>
                    {errors.outcomes && (
                      <p className="text-xs mt-2 text-rose-600">
                        {errors.outcomes}
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl border p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                      <Info className="w-4 h-4 text-blue-600" /> Yêu cầu đầu
                      vào
                    </div>
                    <ul className="space-y-2">
                      {requirements.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <input
                            value={r}
                            onChange={(e) =>
                              setRequirements((arr) =>
                                arr.map((x, idx) =>
                                  idx === i ? e.target.value : x
                                )
                              )
                            }
                            className="flex-1 rounded-lg border px-3 py-2 text-sm"
                          />
                          <button
                            onClick={() =>
                              setRequirements((arr) =>
                                arr.filter((_, idx) => idx !== i)
                              )
                            }
                            className="rounded-lg border px-2 py-2 hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4 text-rose-600" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setRequirements((arr) => [...arr, ""])}
                      className="mt-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Thêm yêu cầu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    2) Nội dung & Giá
                  </h2>
                </div>

                {/* Curriculum */}
                <div className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Layers className="w-4 h-4 text-indigo-600" /> Curriculum
                      *
                    </div>
                    <button
                      onClick={addSection}
                      className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50 inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Thêm section
                    </button>
                  </div>

                  <div className="mt-3 space-y-3">
                    {curriculum.map((s) => (
                      <div key={s.id} className="rounded-lg border">
                        <div className="p-3 flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <input
                            value={s.title}
                            onChange={(e) =>
                              setCurriculum((arr) =>
                                arr.map((x) =>
                                  x.id === s.id
                                    ? { ...x, title: e.target.value }
                                    : x
                                )
                              )
                            }
                            className="flex-1 rounded-lg border px-3 py-2 text-sm"
                          />
                          <button
                            onClick={() => moveSection(s.id, "up")}
                            className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveSection(s.id, "down")}
                            className="rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeSection(s.id)}
                            className="rounded-lg border px-2 py-1.5 hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4 text-rose-600" />
                          </button>
                        </div>

                        {/* Lessons */}
                        <div className="px-3 pb-3 space-y-2">
                          {s.lessons.map((l) => (
                            <div
                              key={l.id}
                              className="rounded-lg border p-3 grid gap-2 md:grid-cols-[1fr_140px_120px_auto] md:items-center"
                            >
                              <input
                                value={l.title}
                                onChange={(e) =>
                                  setCurriculum((arr) =>
                                    arr.map((sec) =>
                                      sec.id === s.id
                                        ? {
                                            ...sec,
                                            lessons: sec.lessons.map(
                                              (it) =>
                                                it.id === l.id
                                                  ? {
                                                      ...it,
                                                      title: e.target.value,
                                                    }
                                                  : it
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
                                            lessons: sec.lessons.map(
                                              (it) =>
                                                it.id === l.id
                                                  ? {
                                                      ...it,
                                                      type: e.target.value,
                                                    }
                                                  : it
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
                                            lessons: sec.lessons.map(
                                              (it) =>
                                                it.id === l.id
                                                  ? {
                                                      ...it,
                                                      duration: e.target.value,
                                                    }
                                                  : it
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
                                  <Trash2 className="w-4 h-4 text-rose-600" />{" "}
                                  Xoá
                                </button>
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={() => addLesson(s.id)}
                            className="text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Thêm bài học
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.curriculum && (
                    <p className="text-xs mt-2 text-rose-600">
                      {errors.curriculum}
                    </p>
                  )}
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
                      onChange={(e) =>
                        setPricing((p) => ({
                          ...p,
                          price: Math.max(0, +e.target.value || 0),
                        }))
                      }
                      className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">
                      Giảm giá (%)
                    </span>
                    <input
                      type="number"
                      value={pricing.discount}
                      onChange={(e) =>
                        setPricing((p) => ({
                          ...p,
                          discount: Math.min(
                            100,
                            Math.max(0, +e.target.value || 0)
                          ),
                        }))
                      }
                      className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                  <div className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">
                      Giá sau giảm
                    </span>
                    <div className="rounded-xl border px-4 py-2 text-gray-900 bg-gray-50">
                      {money(finalPrice)}
                    </div>
                    <div className="text-xs text-gray-600">
                      Ước tính doanh thu (100 HV, net 85%):{" "}
                      <b>{money(estRevenue)}</b>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    3) Cài đặt & SEO
                  </h2>
                  <p className="text-sm text-gray-600">
                    Từ khoá, mô tả ngắn SEO, quyền hiển thị & review.
                  </p>
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800 inline-flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Từ khoá (nhấn Enter để
                      thêm)
                    </span>
                    <TagInput
                      value={seo.keywords}
                      onChange={(kws) =>
                        setSeo((x) => ({ ...x, keywords: kws }))
                      }
                    />
                  </label>

                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-gray-800">
                      Mô tả SEO (tối đa 160 ký tự)
                    </span>
                    <textarea
                      value={seo.shortDesc}
                      onChange={(e) =>
                        setSeo((x) => ({
                          ...x,
                          shortDesc: e.target.value.slice(0, 160),
                        }))
                      }
                      rows={3}
                      placeholder="Mô tả xuất hiện trên công cụ tìm kiếm…"
                      className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <span className="text-xs text-gray-500">
                      {seo.shortDesc.length} / 160
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-4">
                    <label className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={seo.isPublic}
                        onChange={(e) =>
                          setSeo((x) => ({
                            ...x,
                            isPublic: e.target.checked,
                          }))
                        }
                      />
                      Public (hiển thị trên marketplace)
                    </label>
                    <label className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={seo.allowReviews}
                        onChange={(e) =>
                          setSeo((x) => ({
                            ...x,
                            allowReviews: e.target.checked,
                          }))
                        }
                      />
                      Cho phép đánh giá
                    </label>
                  </div>

                  {!canPublish && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 inline-flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5" />
                      <div>
                        Cần hoàn thiện thông tin bắt buộc trước khi publish:
                        <ul className="list-disc ml-5">
                          {errors.title && <li>Tiêu đề khoá học</li>}
                          {errors.categoryId && <li>Danh mục</li>}
                          {errors.outcomes && (
                            <li>Mục tiêu đạt được</li>
                          )}
                          {errors.curriculum && (
                            <li>Curriculum (ít nhất 1 section)</li>
                          )}
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
                onClick={prev}
                disabled={step === 1}
                className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
                  step === 1
                    ? "text-gray-400 border-gray-200"
                    : "hover:bg-gray-50"
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
                  onClick={publishDraft}
                  disabled={!canPublish}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 ${
                    canPublish
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Rocket className="w-4 h-4" />{" "}
                  {submitting ? "Đang publish..." : "Publish"}
                </button>
                <button
                  onClick={next}
                  disabled={step === 3}
                  className={`rounded-lg border px-4 py-2 text-sm inline-flex items-center gap-2 ${
                    step === 3
                      ? "text-gray-400 border-gray-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Tiếp <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT: preview */}
          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="aspect-video bg-gray-100 grid place-items-center text-gray-500">
                {basic.thumbnail ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img
                    src={basic.thumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Thumbnail Preview
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-600 mb-1">
                  {selectedCategoryName} • {basic.level} •{" "}
                  <Globe2 className="inline w-3.5 h-3.5 mr-1" />
                  {basic.lang}
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {basic.title || "Tiêu đề khoá học"}
                </h3>
                <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                  {basic.subtitle ||
                    "Mô tả ngắn sẽ hiển thị ở đây..."}
                </p>
                <div className="mt-3 text-sm text-gray-700 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-4 h-4" /> 0 HV
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Timer className="w-4 h-4" /> ~{" "}
                    {curriculum.reduce(
                      (s, sec) => s + sec.lessons.length,
                      0
                    )}{" "}
                    bài
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <DollarSign className="w-4 h-4" /> {money(finalPrice)}
                  </span>
                </div>

                {seo.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {seo.keywords.slice(0, 6).map((k) => (
                      <span
                        key={k}
                        className="text-xs px-2 py-1 rounded-full border"
                      >
                        @{k}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <button className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> Xem trang public
                  </button>
                  <Link
                    to="/i/courses"
                    className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" /> Về danh sách
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5">
              <h4 className="text-sm font-bold text-gray-900">
                Checklist xuất bản
              </h4>
              <ul className="mt-2 text-sm space-y-1">
                <li
                  className={`inline-flex items-center gap-2 ${
                    basic.title ? "text-emerald-700" : "text-gray-700"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Tiêu đề khoá
                </li>
                <li
                  className={`inline-flex items-center gap-2 ${
                    outcomes.length ? "text-emerald-700" : "text-gray-700"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Ít nhất 1 mục tiêu
                </li>
                <li
                  className={`inline-flex items-center gap-2 ${
                    curriculum.length ? "text-emerald-700" : "text-gray-700"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Có section/lesson
                </li>
                <li className="inline-flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-4 h-4" /> Ảnh thumbnail
                  (khuyến nghị)
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ===== Tag input (chips) ===== */
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
          <span
            key={k}
            className="text-xs px-2 py-1 rounded-full border inline-flex items-center gap-2"
          >
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


















// {
//   "title": "React Mastery",
//   "description": "Khoá học React từ cơ bản đến nâng cao.",
//   "categoryId": "Frontend Web",
//   "price": 990000,
//   "discountPrice": 10,
//   "thumbnailUrl": "https://example.com/thumbnail.png",
//   "introduce": "Khoá học chất lượng giúp bạn làm chủ React."
// }