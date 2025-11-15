// src/pages/instructor/ExamNew.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ArrowLeft, Plus, Search, Filter, Timer, Layers3, Tag, Settings2, Upload,
  Save, Rocket, Download, Eye, Trash2, GripVertical, ArrowUp, ArrowDown, CheckCircle2
} from "lucide-react";

/* ================= MOCK DATA (thay bằng API khi sẵn sàng) ================= */
const COURSES = [
  { id: 1, title: "React 18 Pro" },
  { id: 2, title: "Node.js RESTful API" },
  { id: 3, title: "SQL Practical" },
];

const BANK = Array.from({ length: 64 }, (_, i) => {
  const types = ["mcq", "truefalse", "fill"];
  const diffs = ["easy", "medium", "hard"];
  const tags = [["JS"], ["React"], ["Node"], ["SQL"], ["CSS"], ["Async","JS"], ["Hooks","React"], ["HTTP","Node"]];
  const t = types[i % types.length];
  const d = diffs[i % diffs.length];
  const tg = tags[i % tags.length];
  return {
    id: 1000 + i,
    type: t,                             // mcq | truefalse | fill
    difficulty: d,                       // easy | medium | hard
    tags: tg,
    text:
      t === "mcq" ? `Câu ${i+1}: Chọn đáp án đúng cho chủ đề ${tg[0]}?`
      : t === "truefalse" ? `Câu ${i+1}: Phát biểu sau đúng hay sai?`
      : `Câu ${i+1}: Điền vào chỗ trống theo chủ đề ${tg[0]}.`,
    options: t === "mcq" ? ["A", "B", "C", "D"] : null,
    answer: t === "mcq" ? "A" : (t === "truefalse" ? "True" : "___"),
    points: d === "hard" ? 3 : d === "medium" ? 2 : 1,
    estSec: d === "hard" ? 120 : d === "medium" ? 90 : 60,
  };
});

/* ================= SMALL HELPERS ================= */
const diffBadge = (d) =>
  d === "easy" ? "bg-emerald-100 text-emerald-700"
  : d === "medium" ? "bg-amber-100 text-amber-700"
  : "bg-rose-100 text-rose-700";

const typeBadge = (t) =>
  t === "mcq" ? "bg-indigo-100 text-indigo-700"
  : t === "truefalse" ? "bg-blue-100 text-blue-700"
  : "bg-violet-100 text-violet-700";

const fmtMinSec = (sec) => {
  const m = Math.floor(sec/60), s = sec%60;
  return `${m}’${String(s).padStart(2,"0")}”`;
};

export default function ExamNew() {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0,0), []);

  /* ---------- Exam meta ---------- */
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState(COURSES[0].id);
  const [timeLimit, setTimeLimit] = useState(60); // phút
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleOptions, setShuffleOptions] = useState(true);
  const [visibility, setVisibility] = useState("private"); // private | unlisted | public
  const [description, setDescription] = useState("");

  /* ---------- Builder (selected questions) ---------- */
  const [selected, setSelected] = useState([]); // [{...BANK[i]}]
  const totalPoints = useMemo(() => selected.reduce((s,q)=>s+q.points,0), [selected]);
  const totalSec = useMemo(() => selected.reduce((s,q)=>s+q.estSec,0), [selected]);

  const moveUp = (idx) => {
    if (idx<=0) return;
    const next = selected.slice();
    [next[idx-1], next[idx]] = [next[idx], next[idx-1]];
    setSelected(next);
  };
  const moveDown = (idx) => {
    if (idx>=selected.length-1) return;
    const next = selected.slice();
    [next[idx+1], next[idx]] = [next[idx], next[idx+1]];
    setSelected(next);
  };
  const removeSel = (qid) => setSelected(arr => arr.filter(q => q.id !== qid));

  /* ---------- Bank filters ---------- */
  const [q, setQ] = useState("");
  const [fType, setFType] = useState("all");
  const [fDiff, setFDiff] = useState("all");
  const [fTag, setFTag] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const bankTags = useMemo(() => {
    const all = new Set();
    BANK.forEach(b => b.tags.forEach(t => all.add(t)));
    return ["all", ...Array.from(all)];
  }, []);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return BANK.filter(b => {
      const okQ = !qq || b.text.toLowerCase().includes(qq);
      const okT = fType === "all" || b.type === fType;
      const okD = fDiff === "all" || b.difficulty === fDiff;
      const okG = fTag === "all" || b.tags.includes(fTag);
      return okQ && okT && okD && okG;
    });
  }, [q,fType,fDiff,fTag]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const view = filtered.slice((safePage-1)*PAGE_SIZE, safePage*PAGE_SIZE);

  const addToExam = (item) => {
    if (selected.find(x => x.id === item.id)) return;
    setSelected(arr => [...arr, item]);
  };

  /* ---------- Create Question Modal ---------- */
  const [showCreate, setShowCreate] = useState(false);
  const [cqType, setCqType] = useState("mcq");
  const [cqText, setCqText] = useState("");
  const [cqOptions, setCqOptions] = useState(["", "", "", ""]);
  const [cqAnswer, setCqAnswer] = useState("A");
  const [cqDiff, setCqDiff] = useState("easy");
  const [cqTags, setCqTags] = useState("JS");

  const resetCreate = () => {
    setCqType("mcq"); setCqText("");
    setCqOptions(["","","",""]); setCqAnswer("A");
    setCqDiff("easy"); setCqTags("JS");
  };

  const createQuestion = () => {
    if (!cqText.trim()) { alert("Nhập nội dung câu hỏi"); return; }
    if (cqType === "mcq" && cqOptions.some(o => !o.trim())) {
      alert("Nhập đủ 4 phương án cho MCQ"); return;
    }
    const newQ = {
      id: Date.now(),
      type: cqType,
      difficulty: cqDiff,
      tags: cqTags.split(",").map(s=>s.trim()).filter(Boolean),
      text: cqText.trim(),
      options: cqType === "mcq" ? cqOptions.slice() : null,
      answer: cqType === "mcq" ? cqAnswer : (cqType === "truefalse" ? "True" : "___"),
      points: cqDiff === "hard" ? 3 : cqDiff === "medium" ? 2 : 1,
      estSec: cqDiff === "hard" ? 120 : cqDiff === "medium" ? 90 : 60,
    };
    // Thêm thẳng vào đề + (demo) cũng add vào view tạm thời
    setSelected(arr => [...arr, newQ]);
    alert("Đã tạo câu hỏi và thêm vào đề (demo)");
    setShowCreate(false); resetCreate();
  };

  /* ---------- Import CSV (demo) ---------- */
  const onImportCSV = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(`Đã chọn file: ${file.name}\n(Demo) Bạn sẽ parse CSV ở backend/worker để tạo batch câu hỏi.`);
    e.target.value = "";
  };

  /* ---------- Save draft / Publish (demo) ---------- */
  const assembleExam = () => ({
    title,
    courseId,
    description,
    timeLimitMin: timeLimit,
    shuffleQuestions,
    shuffleOptions,
    visibility,
    questions: selected.map((q, idx) => ({
      order: idx+1, id: q.id, type: q.type, difficulty: q.difficulty,
      points: q.points, estSec: q.estSec, tags: q.tags, text: q.text, options: q.options, answer: q.answer
    })),
    meta: { totalPoints, totalSec }
  });

  const exportJSON = () => {
    const data = assembleExam();
    const blob = new Blob([JSON.stringify(data,null,2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `exam_draft.json`; a.click(); URL.revokeObjectURL(url);
  };

  const saveDraft = () => {
    if (!title.trim()) { alert("Nhập tên đề thi"); return; }
    alert("Đã lưu nháp (demo). Console xem payload.");
    console.log("EXAM_DRAFT", assembleExam());
  };

  const publish = () => {
    if (selected.length === 0) { alert("Vui lòng thêm ít nhất 1 câu hỏi"); return; }
    if (!confirm("Xuất bản đề thi ở trạng thái published? (demo)")) return;
    alert("Đã publish (demo). Điều hướng về /i/exams");
    navigate("/i/exams");
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/i/exams" className="rounded-lg border px-3 py-1.5 hover:bg-white inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách đề
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">🆕 Tạo đề thi (Builder)</h1>
              <p className="text-gray-600">Chọn khoá học, cấu hình đề, thêm câu hỏi từ ngân hàng hoặc tự tạo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportJSON} className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-white inline-flex items-center gap-2">
              <Download className="w-4 h-4" /> Export JSON
            </button>
            <button onClick={saveDraft} className="rounded-xl bg-slate-900 hover:opacity-95 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
              <Save className="w-4 h-4" /> Lưu nháp
            </button>
            <button onClick={publish} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
              <Rocket className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>
      </section>

      <main className="w-full px-6 lg:px-12 py-8 grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">
        {/* LEFT: Builder */}
        <section className="space-y-6">
          {/* Exam meta */}
          <div className="rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Settings2 className="w-4 h-4" /> Cấu hình đề thi
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Tên đề thi</label>
                <input
                  value={title} onChange={(e)=>setTitle(e.target.value)}
                  placeholder="VD: React Hooks – 40 câu"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Khoá học</label>
                <select
                  value={courseId} onChange={(e)=>setCourseId(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2"
                >
                  {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Thời gian (phút)</label>
                <input
                  type="number" min={5} step={5}
                  value={timeLimit} onChange={(e)=>setTimeLimit(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Chế độ hiển thị</label>
                <select value={visibility} onChange={(e)=>setVisibility(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2">
                  <option value="private">Private</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Mô tả</label>
                <textarea
                  rows={3}
                  value={description} onChange={(e)=>setDescription(e.target.value)}
                  placeholder="Mô tả ngắn gọn về nội dung đề thi, đối tượng, lưu ý..."
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={shuffleQuestions} onChange={(e)=>setShuffleQuestions(e.target.checked)} />
                Trộn thứ tự câu hỏi
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={shuffleOptions} onChange={(e)=>setShuffleOptions(e.target.checked)} />
                Trộn phương án (MCQ)
              </label>
              <div className="text-sm text-gray-700 inline-flex items-center gap-2">
                <Timer className="w-4 h-4" /> Giới hạn {timeLimit} phút
              </div>
            </div>
          </div>

          {/* Selected list (reorder) */}
          <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-bold text-gray-900">Câu hỏi trong đề</div>
              <div className="text-sm text-gray-600 inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Layers3 className="w-4 h-4" /> {selected.length} câu</span>
                <span className="inline-flex items-center gap-1"><Tag className="w-4 h-4" /> {totalPoints} điểm</span>
                <span className="inline-flex items-center gap-1"><Timer className="w-4 h-4" /> ~{fmtMinSec(totalSec)}</span>
              </div>
            </div>

            {selected.length === 0 ? (
              <div className="p-6 text-sm text-gray-600">Chưa có câu hỏi nào. Hãy chọn từ ngân hàng hoặc nhấn “Tạo câu hỏi”.</div>
            ) : (
              <div className="divide-y">
                {selected.map((q, idx) => (
                  <div key={q.id} className="px-5 py-4 grid grid-cols-[24px_1fr_auto] items-start gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Câu {idx+1}</div>
                      <div className="font-medium text-gray-900">{q.text}</div>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${diffBadge(q.difficulty)}`}>{q.difficulty}</span>
                        <span className={`px-2 py-0.5 rounded-full ${typeBadge(q.type)}`}>{q.type}</span>
                        {q.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full border">{t}</span>)}
                        <span className="px-2 py-0.5 rounded-full border">+{q.points} điểm</span>
                        <span className="px-2 py-0.5 rounded-full border">~{fmtMinSec(q.estSec)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>moveUp(idx)} className="rounded-lg border px-2 py-1.5 hover:bg-gray-50" title="Lên">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={()=>moveDown(idx)} className="rounded-lg border px-2 py-1.5 hover:bg-gray-50" title="Xuống">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button onClick={()=>removeSel(q.id)} className="rounded-lg border px-2 py-1.5 hover:bg-gray-50 text-rose-700 border-rose-200" title="Xoá">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="rounded-2xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-gray-900">Preview nhanh</div>
              <span className="text-xs text-gray-500">Mock – chỉ xem layout</span>
            </div>
            <div className="mt-4 border rounded-xl p-4">
              <div className="font-semibold text-gray-900">{title || "Tên đề thi"}</div>
              <div className="text-sm text-gray-600">Khoá học: {COURSES.find(c=>c.id===courseId)?.title}</div>
              <div className="text-sm text-gray-600">Giới hạn: {timeLimit} phút • Điểm: {totalPoints} • Ước tính: {fmtMinSec(totalSec)}</div>
              <ol className="mt-4 list-decimal pl-6 grid gap-2">
                {selected.slice(0,5).map((q)=>(
                  <li key={q.id} className="text-sm text-gray-800">{q.text}</li>
                ))}
                {selected.length>5 && <li className="text-xs text-gray-500">… {selected.length-5} câu nữa</li>}
              </ol>
            </div>
          </div>
        </section>

        {/* RIGHT: Question bank */}
        <aside className="space-y-6 xl:sticky xl:top-24 h-fit">
          {/* Toolbar */}
          <div className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-bold text-gray-900 mb-3">Ngân hàng câu hỏi</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  value={q} onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
                  placeholder="Tìm nội dung câu hỏi…"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                <select value={fType} onChange={(e)=>{setFType(e.target.value); setPage(1);}} className="rounded-xl border px-3 py-2 text-sm">
                  <option value="all">Loại: tất cả</option>
                  <option value="mcq">MCQ</option>
                  <option value="truefalse">True/False</option>
                  <option value="fill">Fill</option>
                </select>
                <select value={fDiff} onChange={(e)=>{setFDiff(e.target.value); setPage(1);}} className="rounded-xl border px-3 py-2 text-sm">
                  <option value="all">Độ khó</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <select value={fTag} onChange={(e)=>{setFTag(e.target.value); setPage(1);}} className="rounded-xl border px-3 py-2 text-sm">
                  {bankTags.map(t => <option key={t} value={t}>{t === "all" ? "Tag: tất cả" : t}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-600">
                Hiển thị {(safePage-1)*PAGE_SIZE+1}–{Math.min(safePage*PAGE_SIZE, filtered.length)} / {filtered.length} câu hỏi
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>setShowCreate(true)} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Tạo câu hỏi
                </button>
                <label className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" /> Nhập CSV
                  <input type="file" accept=".csv" onChange={onImportCSV} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-gray-600 border-b bg-gray-50">
              <div className="col-span-7">Câu hỏi</div>
              <div className="col-span-2 text-center">Điểm</div>
              <div className="col-span-3 text-right">Thêm</div>
            </div>

            {view.map(item => (
              <div key={item.id} className="grid grid-cols-12 px-5 py-4 border-b last:border-b-0 items-start">
                <div className="col-span-7">
                  <div className="font-medium text-gray-900">{item.text}</div>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded-full ${diffBadge(item.difficulty)}`}>{item.difficulty}</span>
                    <span className={`px-2 py-0.5 rounded-full ${typeBadge(item.type)}`}>{item.type}</span>
                    {item.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full border">{t}</span>)}
                    <span className="px-2 py-0.5 rounded-full border">~{fmtMinSec(item.estSec)}</span>
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm font-semibold text-gray-800">+{item.points}</div>
                <div className="col-span-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={()=>addToExam(item)}
                      disabled={!!selected.find(x=>x.id===item.id)}
                      className={`rounded-lg border px-3 py-1.5 text-sm inline-flex items-center gap-2 ${selected.find(x=>x.id===item.id) ? "text-gray-400 border-gray-200 cursor-not-allowed" : "hover:bg-gray-50"}`}
                    >
                      <Plus className="w-4 h-4" /> Thêm
                    </button>
                    <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 inline-flex items-center gap-2" title="Xem nhanh">
                      <Eye className="w-4 h-4" /> Xem
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="px-5 py-3 flex items-center justify-between">
              <button
                onClick={()=>setPage(p=>Math.max(1,p-1))}
                disabled={safePage===1}
                className={`rounded-lg border px-3 py-1.5 text-sm ${safePage===1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"}`}
              >
                ‹ Trước
              </button>
              <div className="text-sm">Trang <b>{safePage}</b> / {pages}</div>
              <button
                onClick={()=>setPage(p=>Math.min(pages,p+1))}
                disabled={safePage===pages}
                className={`rounded-lg border px-3 py-1.5 text-sm ${safePage===pages ? "text-gray-400 border-gray-200" : "hover:bg-gray-50"}`}
              >
                Sau ›
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* CREATE QUESTION MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-40 bg-black/30">
          <div className="absolute inset-x-0 top-[8vh] mx-auto w-[min(880px,94vw)] rounded-2xl border bg-white shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="font-bold text-gray-900">Tạo câu hỏi mới</div>
              <button onClick={()=>{ setShowCreate(false); }} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Loại câu hỏi</label>
                  <select value={cqType} onChange={(e)=>setCqType(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
                    <option value="mcq">MCQ</option>
                    <option value="truefalse">True/False</option>
                    <option value="fill">Điền</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Độ khó</label>
                  <select value={cqDiff} onChange={(e)=>setCqDiff(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Tags (phẩy ,)</label>
                  <input value={cqTags} onChange={(e)=>setCqTags(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Nội dung</label>
                <textarea
                  rows={3}
                  value={cqText}
                  onChange={(e)=>setCqText(e.target.value)}
                  placeholder="Nhập đề bài..."
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {cqType === "mcq" && (
                <>
                  {cqOptions.map((o, i) => (
                    <div key={i}>
                      <label className="text-xs text-gray-600">Phương án {String.fromCharCode(65+i)}</label>
                      <input
                        value={o}
                        onChange={(e)=>{
                          const next = cqOptions.slice();
                          next[i] = e.target.value;
                          setCqOptions(next);
                        }}
                        className="mt-1 w-full rounded-xl border px-3 py-2"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-gray-600">Đáp án đúng</label>
                    <select value={cqAnswer} onChange={(e)=>setCqAnswer(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
                      <option value="A">A</option><option value="B">B</option>
                      <option value="C">C</option><option value="D">D</option>
                    </select>
                  </div>
                </>
              )}

              {cqType === "truefalse" && (
                <div className="md:col-span-2">
                  <div className="rounded-xl border p-3 text-sm">Đáp án mặc định: <b>True</b> (demo). Có thể mở rộng chọn True/False.</div>
                </div>
              )}

              {cqType === "fill" && (
                <div className="md:col-span-2">
                  <div className="rounded-xl border p-3 text-sm">Điền từ khoá (demo). Quy tắc chấm sẽ xử lý ở backend.</div>
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t flex items-center justify-between">
              <button onClick={()=>{ resetCreate(); setShowCreate(false); }} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                Huỷ
              </button>
              <div className="flex items-center gap-2">
                <button onClick={createQuestion} className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Tạo & Thêm vào đề
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
