// // src/pages/shared/Forum.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import { http } from "../../utils/http";
// import { isLoggedIn, requireAuth } from "../../utils/auth";
// import { useAuth } from "../../store/auth";

// /* ===== Theme / Const ===== */
// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
// const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8" };
// const BORDER = "#e5e7eb";

// /* ===== Token helpers (khớp với các key bạn đang dùng) ===== */
// function getAccessTokenFromStorage() {
//   try {
//     const a = JSON.parse(localStorage.getItem("auth_token") || "null");
//     if (a?.accessToken) return a.accessToken;
//     if (typeof a === "string") return a;
//   } catch {}
//   try {
//     const b = JSON.parse(localStorage.getItem("token") || "null");
//     if (b?.accessToken) return b.accessToken;
//   } catch {}
//   try {
//     const c = localStorage.getItem("access_token");
//     if (c) return c;
//   } catch {}
//   return null;
// }
// function authHeaders(extra = {}) {
//   const token = getAccessTokenFromStorage();
//   return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
// }

// /* ===== Layout helpers ===== */
// const Section = ({ id, title, subtitle, action, children }) => (
//   <section id={id} className="w-screen overflow-x-hidden py-8 lg:py-10">
//     <div className="w-screen px-6 lg:px-12">
//       {(title || subtitle || action) && (
//         <div className="mb-5 flex items-end justify-between gap-4">
//           <div>
//             {title && <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{title}</h2>}
//             {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
//           </div>
//           {action}
//         </div>
//       )}
//       {children}
//     </div>
//   </section>
// );

// const Primary = ({ children, className = "", ...props }) => (
//   <button
//     type="button"
//     className={
//       "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
//       className
//     }
//     {...props}
//   >
//     {children}
//   </button>
// );

// /* ===== Normalizers ===== */
// const normQuestion = (q) => {
//   // dựa trên kinh nghiệm các API .NET: title, tags?, createdAt, authorName, isDeleted?
//   return {
//     id: q?.id,
//     title: q?.title || "Câu hỏi",
//     createdAt: q?.createdAt || q?.createdDate || null,
//     authorId: q?.authorId || q?.memberId || null,
//     authorName: q?.authorName || "Ẩn danh",
//     isDeleted: !!q?.isDeleted,
//     // If server returns contentJson or content, keep both
//     content: (() => {
//       if (q?.content) return q.content;
//       if (q?.contentJson) {
//         try {
//           const cj = typeof q.contentJson === "string" ? JSON.parse(q.contentJson) : q.contentJson;
//           return cj?.blocks?.map((b) => b?.text)?.join("\n\n") || "";
//         } catch {
//           return "";
//         }
//       }
//       return "";
//     })(),
//   };
// };

// const normComment = (d) => ({
//   id: d?.id,
//   authorName: d?.authorName || d?.memberName || "Ẩn danh",
//   createdAt: d?.createdAt || d?.createdDate || null,
//   content: d?.content || d?.text || "",
// });

// /* ===== Question Card ===== */
// function QuestionCard({ q, onOpen }) {
//   return (
//     <article className="rounded-2xl border bg-white p-5 hover:shadow-md transition" style={{ borderColor: BORDER }}>
//       <h3 className="font-semibold text-slate-900 leading-snug">{q.title}</h3>
//       <div className="mt-2 text-sm text-slate-600 line-clamp-2 whitespace-pre-wrap">
//         {q.content || "—"}
//       </div>
//       <div className="mt-3 text-xs text-slate-500">
//         <span className="font-medium text-slate-700">{q.authorName}</span>
//         {" • "}
//         {q.createdAt ? new Date(q.createdAt).toLocaleString("vi-VN", { hour12: false }) : "—"}
//       </div>
//       <button
//         className="mt-3 rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
//         onClick={() => onOpen(q.id)}
//       >
//         Xem chi tiết & trả lời
//       </button>
//     </article>
//   );
// }

// /* ===== Modal: Detail + Discussion ===== */
// function QuestionModal({ openId, onClose }) {
//   const loggedIn = isLoggedIn();
//   const [loading, setLoading] = useState(false);
//   const [q, setQ] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [err, setErr] = useState("");
//   const [reply, setReply] = useState("");
//   const TARGET_TYPE = "ForumQuestion";

//   useEffect(() => {
//     if (!openId) return;
//     (async () => {
//       try {
//         setLoading(true);
//         setErr("");
//         // detail
//         const r1 = await http(`${API_BASE}/api/ForumQuestion/${openId}`, {
//           headers: { accept: "*/*" },
//         });
//         if (!r1.ok) throw new Error(`HTTP ${r1.status}`);
//         const qdata = await r1.json();
//         setQ(normQuestion(qdata));

//         // comments
//         const r2 = await http(`${API_BASE}/api/Discussion/${TARGET_TYPE}/${openId}`, {
//           headers: { accept: "*/*" },
//         });
//         const j2 = r2.ok ? await r2.json() : [];
//         setComments((Array.isArray(j2) ? j2 : []).map(normComment));
//       } catch (e) {
//         setErr(e?.message || "Không tải được câu hỏi");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [openId]);

//   const sendReply = async () => {
//     const text = reply.trim();
//     if (!text || !openId || !loggedIn) return;
//     try {
//       const res = await http(`${API_BASE}/api/Discussion/${TARGET_TYPE}/${openId}`, {
//         method: "POST",
//         headers: authHeaders({ "Content-Type": "application/json", accept: "*/*" }),
//         body: JSON.stringify({ content: text }),
//       });
//       if (!res.ok) {
//         let msg = `HTTP ${res.status}`;
//         try {
//           const j = await res.json();
//           if (j?.message) msg = j.message;
//         } catch {}
//         throw new Error(msg);
//       }
//       setReply("");
//       // reload comments
//       const r2 = await http(`${API_BASE}/api/Discussion/${TARGET_TYPE}/${openId}`, {
//         headers: { accept: "*/*" },
//       });
//       const j2 = r2.ok ? await r2.json() : [];
//       setComments((Array.isArray(j2) ? j2 : []).map(normComment));
//     } catch (e) {
//       alert("Không gửi trả lời được: " + (e?.message || "lỗi"));
//     }
//   };

//   if (!openId) return null;

//   return (
//     <div className="fixed inset-0 z-[200] bg-black/40 grid place-items-center p-4">
//       <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-lg">
//         <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: BORDER }}>
//           <div className="font-semibold">Chi tiết câu hỏi</div>
//           <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50" onClick={onClose}>
//             Đóng
//           </button>
//         </div>

//         <div className="p-5 max-h-[75vh] overflow-y-auto">
//           {err && (
//             <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//               {err}
//             </div>
//           )}

//           {loading ? (
//             <div className="text-slate-600">Đang tải…</div>
//           ) : q ? (
//             <>
//               <h3 className="text-xl font-semibold text-slate-900">{q.title}</h3>
//               <div className="text-sm text-slate-500 mt-1">
//                 {q.authorName} • {q.createdAt ? new Date(q.createdAt).toLocaleString("vi-VN", { hour12: false }) : "—"}
//               </div>
//               <div className="mt-4 whitespace-pre-wrap text-slate-800">{q.content || "—"}</div>

//               {/* Replies */}
//               <div className="mt-6">
//                 <div className="font-medium text-slate-900 mb-2">Trả lời</div>
//                 <div className="grid gap-3">
//                   {comments.length === 0 && <div className="text-sm text-slate-500">Chưa có câu trả lời.</div>}
//                   {comments.map((c) => (
//                     <div key={c.id} className="rounded-xl border p-3" style={{ borderColor: BORDER }}>
//                       <div className="text-sm font-medium text-slate-900">{c.authorName}</div>
//                       <div className="text-xs text-slate-500">
//                         {c.createdAt ? new Date(c.createdAt).toLocaleString("vi-VN", { hour12: false }) : "—"}
//                       </div>
//                       <div className="mt-2 text-slate-800 whitespace-pre-wrap">{c.content}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Reply box */}
//                 {isLoggedIn() ? (
//                   <div className="mt-4 grid gap-2">
//                     <textarea
//                       rows={3}
//                       value={reply}
//                       onChange={(e) => setReply(e.target.value)}
//                       placeholder="Viết câu trả lời của bạn…"
//                       className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
//                       style={{ borderColor: BORDER }}
//                     />
//                     <div className="flex justify-end">
//                       <Primary onClick={sendReply}>Gửi trả lời</Primary>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="mt-4 text-sm text-slate-500">
//                     Vui lòng <Link to="/login" className="text-blue-600 underline">đăng nhập</Link> để trả lời.
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="text-slate-600">Không tìm thấy câu hỏi.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===== Composer: tạo câu hỏi (chỉ khi đăng nhập) ===== */
// function Composer({ onCreated }) {
//   const loggedIn = isLoggedIn();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [err, setErr] = useState("");
//   const [okMsg, setOkMsg] = useState("");

//   if (!loggedIn) return null;

//   const canSubmit = title.trim().length >= 4 && content.trim().length >= 10;

//   const createQuestion = async () => {
//     if (!canSubmit || submitting) return;
//     try {
//       setSubmitting(true);
//       setErr(""); setOkMsg("");

//       // Nếu backend bạn nhận "content" dạng chuỗi, đổi payload.contentJson → content: content.trim()
//       const payload = {
//         title: title.trim(),
//         contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
//       };

//       const res = await http(`${API_BASE}/api/ForumQuestion`, {
//         method: "POST",
//         headers: authHeaders({ "Content-Type": "application/json", accept: "*/*" }),
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) {
//         let msg = `HTTP ${res.status}`;
//         try {
//           const j = await res.json();
//           if (j?.message) msg = j.message;
//         } catch {}
//         throw new Error(msg);
//       }
//       const created = await res.json();
//       setOkMsg("🎉 Đăng câu hỏi thành công!");
//       setTitle(""); setContent("");
//       onCreated?.(normQuestion(created));
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (e) {
//       setErr(e?.message || "Không thể tạo câu hỏi");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Section id="ask" title="Đặt câu hỏi">
//       <div className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
//         {okMsg && (
//           <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm px-4 py-3">
//             {okMsg}
//           </div>
//         )}
//         {err && (
//           <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//             {err}
//           </div>
//         )}
//         <div className="grid gap-4">
//           <div>
//             <label className="text-sm font-medium">Tiêu đề</label>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Ví dụ: Cách tối ưu render danh sách lớn trong React?"
//               className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
//               style={{ borderColor: BORDER }}
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Nội dung</label>
//             <textarea
//               rows={6}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Mô tả vấn đề, những gì đã thử, kỳ vọng…"
//               className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
//               style={{ borderColor: BORDER }}
//             />
//           </div>
//           <div className="flex justify-end">
//             <Primary
//               disabled={!canSubmit || submitting}
//               onClick={createQuestion}
//               className={submitting ? "opacity-70 cursor-not-allowed" : ""}
//             >
//               {submitting ? "Đang đăng…" : "Đăng câu hỏi"}
//             </Primary>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }

// /* ===== Page ===== */
// export default function Forum() {
//   const { hydrate } = useAuth();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [openId, setOpenId] = useState(null);

//   useEffect(() => { hydrate?.(); }, [hydrate]);

//   const fetchAll = async () => {
//     const res = await http(`${API_BASE}/api/ForumQuestion`, { headers: { accept: "*/*" } });
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const j = await res.json();
//     const list = (Array.isArray(j) ? j : []).map(normQuestion);
//     list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
//     return list;
//   };

//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         setLoading(true);
//         setErr("");
//         const list = await fetchAll();
//         if (alive) setItems(list);
//       } catch (e) {
//         if (alive) setErr(e?.message || "Không thể tải danh sách câu hỏi");
//       } finally {
//         if (alive) setLoading(false);
//       }
//     })();
//     return () => { alive = false; };
//   }, []);

//   const onCreated = (q) => {
//     setItems((prev) => [q, ...prev]);
//   };

//   return (
//     <>
//       <Header />
//       <main className="w-screen overflow-x-hidden">
//         {/* Hero */}
//         <Section
//           id="hero"
//           title="Hỏi đáp cộng đồng"
//           subtitle="Đặt câu hỏi và nhận câu trả lời từ mọi người. Chưa đăng nhập vẫn có thể xem."
//           action={
//             <Link to="/blog" className="text-blue-600 hover:underline">
//               ← Về Blog
//             </Link>
//           }
//         />

//         {/* Composer: chỉ hiện khi đã đăng nhập */}
//         <Composer onCreated={onCreated} />

//         {/* List */}
//         <Section id="list" title="Câu hỏi mới">
//           {err && (
//             <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm mb-4">
//               {err}
//             </div>
//           )}
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="rounded-2xl border bg-white p-5 animate-pulse" style={{ borderColor: BORDER }}>
//                   <div className="h-5 w-3/4 bg-slate-100 rounded" />
//                   <div className="h-3 w-full bg-slate-100 rounded mt-3" />
//                   <div className="h-3 w-2/3 bg-slate-100 rounded mt-2" />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {items.map((q) => (
//                 <QuestionCard key={q.id} q={q} onOpen={setOpenId} />
//               ))}
//               {items.length === 0 && (
//                 <div className="rounded-xl border bg-white p-6 text-slate-600">
//                   Chưa có câu hỏi nào.
//                 </div>
//               )}
//             </div>
//           )}
//         </Section>
//       </main>
//       <Footer />

//       {/* Modal chi tiết */}
//       <QuestionModal openId={openId} onClose={() => setOpenId(null)} />
//     </>
//   );
// }


















// src/pages/forum/ForumHome.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";
import { isLoggedIn } from "../../utils/auth";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
const BORDER = "#e5e7eb";
const PRIMARY = "#2563eb";
const PRIMARY_HOVER = "#1d4ed8";

function SearchBar({ onSubmit }) {
  const [q, setQ] = useState("");
  const submit = (e) => { e?.preventDefault?.(); onSubmit?.(q.trim()); };
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm câu hỏi theo tiêu đề / tag / tác giả…"
        className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2"
        style={{ borderColor: BORDER }}
      />
      <button
        type="submit"
        className="rounded-full text-white px-5 py-3"
        style={{ background: PRIMARY }}
        onMouseEnter={(e)=>e.currentTarget.style.background=PRIMARY_HOVER}
        onMouseLeave={(e)=>e.currentTarget.style.background=PRIMARY}
      >
        Tìm kiếm
      </button>
    </form>
  );
}

function QuestionCard({ q }) {
  const count = q?.discussionCount ?? q?.answers ?? 0;
  return (
    <article className="rounded-2xl border bg-white p-5 hover:shadow-sm transition" style={{ borderColor: BORDER }}>
      <Link to={`/forum/${q.id}`} className="block">
        <h3 className="font-semibold text-slate-900 line-clamp-2">{q.title || "Câu hỏi"}</h3>
      </Link>
      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
        {(q?.excerpt || q?.summary || "").trim() || "—"}
      </p>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span className="truncate max-w-[70%]" title={q.authorName}>{q.authorName || "Người hỏi"}</span>
        <span>{new Date(q.createdAt || q.updatedAt || Date.now()).toLocaleString("vi-VN", { hour12: false })}</span>
      </div>
      <div className="mt-2 text-xs text-slate-500">{count} trả lời</div>
    </article>
  );
}

export default function ForumHome() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchList = async () => {
    const res = await http(`${API_BASE}/api/ForumQuestion`, { headers: { accept: "*/*" }});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true); setErr(null);
        const list = await fetchList();
        if (!mounted) return;
        // Chuẩn hóa nhẹ
        setItems(list.sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0)));
      } catch (e) {
        if (mounted) setErr(e?.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const onSearch = (q) => {
    if (!q) return;
    navigate(`/forum/search?q=${encodeURIComponent(q)}`);
  };

  const canAsk = isLoggedIn();

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <section className="w-screen px-6 lg:px-12 pt-8">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Hỏi – Đáp</h1>
            <div className="flex items-center gap-2">
              <Link
                to={canAsk ? "/forum/new" : "/login?redirect=/forum/new"}
                className="rounded-full text-white px-4 py-2 text-sm font-semibold"
                style={{ background: PRIMARY }}
                onMouseEnter={(e)=>e.currentTarget.style.background=PRIMARY_HOVER}
                onMouseLeave={(e)=>e.currentTarget.style.background=PRIMARY}
              >
                + Đặt câu hỏi
              </Link>
              <Link to="/forum/my" className="text-[15px] text-blue-600 hover:underline">Câu hỏi của tôi</Link>
            </div>
          </div>

          <div className="mt-6">
            <SearchBar onSubmit={onSearch} />
          </div>
        </section>

        <section className="w-screen px-6 lg:px-12 py-8">
          {err && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4">Không thể tải: {err}</div>}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({length:6}).map((_,i)=>(
                <div key={i} className="rounded-2xl border bg-white p-5 animate-pulse" style={{ borderColor: BORDER }}>
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded mt-3" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded mt-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((q)=> <QuestionCard key={q.id} q={q} />)}
              {items.length === 0 && <div className="text-slate-600">Chưa có câu hỏi nào.</div>}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}




























