// // src/pages/BlogEditor.jsx
// "use client";

// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import { useAuth } from "../../store/auth";
// import { http } from "../../utils/http";

// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
// const BORDER = "#e5e7eb";

// export default function BlogEditor() {
//   const { id } = useParams(); // nếu có id => edit, không có => create
//   const isEdit = !!id;
//   const navigate = useNavigate();
//   const { user, hydrate } = useAuth();
//   const location = useLocation();

//   const [title, setTitle] = useState("");
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [tags, setTags] = useState("");
//   const [body, setBody] = useState("");
//   const [isPublished, setIsPublished] = useState(true);

//   const [loading, setLoading] = useState(isEdit);
//   const [saving, setSaving] = useState(false);
//   const [err, setErr] = useState(null);

//   useEffect(() => { hydrate(); }, [hydrate]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (!isEdit) return;
//     let mounted = true;

//     (async () => {
//       try {
//         setLoading(true);
//         setErr(null);
//         const res = await http(`${API_BASE}/api/Posts/${id}`, { headers: { accept: "*/*" } });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();
//         // fill form
//         setTitle(json?.title || "");
//         setThumbnailUrl(json?.thumbnailUrl || "");
//         setTags(json?.tags || "");
//         setIsPublished(!!json?.isPublished);

//         // parse contentJson -> body
//         let bodyText = "";
//         try {
//           const parsed = typeof json?.contentJson === "string" ? JSON.parse(json.contentJson) : json?.contentJson;
//           const blocks = Array.isArray(parsed?.blocks) ? parsed.blocks : [];
//           bodyText = blocks.map(b => String(b?.text || "")).filter(Boolean).join("\n\n");
//         } catch {}
//         setBody(bodyText);
//       } catch (e) {
//         if (mounted) setErr(e?.message || "Fetch error");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();

//     return () => { mounted = false; };
//   }, [id, isEdit]);

//   const ensureLogin = () => {
//     if (!user) {
//       // đưa về login, kèm returnTo
//       navigate(`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`, { replace: true });
//       return false;
//     }
//     return true;
//   };

//   const buildPayload = () => {
//     const contentJson = JSON.stringify({
//       blocks: body
//         .split(/\n{2,}/g)
//         .map((t) => ({ text: t.trim() }))
//         .filter((b) => b.text),
//     });
//     return {
//       title: title.trim(),
//       thumbnailUrl: thumbnailUrl.trim(),
//       tags: tags.trim(),
//       isPublished: !!isPublished,
//       contentJson,
//     };
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!ensureLogin()) return;

//     try {
//       setSaving(true);
//       setErr(null);
//       const payload = buildPayload();

//       if (isEdit) {
//         const res = await http(`${API_BASE}/api/Posts/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json", accept: "*/*" },
//           body: JSON.stringify(payload),
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         navigate(`/blog/${id}`, { replace: true });
//       } else {
//         const res = await http(`${API_BASE}/api/Posts`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", accept: "*/*" },
//           body: JSON.stringify(payload),
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         // nếu API trả lại id mới → có thể đọc và chuyển thẳng; nếu không, quay về blog list
//         navigate(`/blog`, { replace: true });
//       }
//     } catch (e) {
//       setErr(e?.message || "Lưu bài viết thất bại");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <main className="w-screen overflow-x-hidden">
//         <section className="w-screen overflow-x-hidden py-10 lg:py-14">
//           <div className="w-screen px-6 lg:px-12 max-w-5xl">
//             <div className="mb-6">
//               <div className="text-sm text-slate-500">
//                 <Link to="/blog" className="hover:underline">Blog</Link> / {isEdit ? "Chỉnh sửa" : "Viết bài mới"}
//               </div>
//               <h1 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">
//                 {isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
//               </h1>
//             </div>

//             {loading ? (
//               <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600 animate-pulse" style={{ borderColor: BORDER }}>
//                 Đang tải dữ liệu…
//               </div>
//             ) : (
//               <form onSubmit={onSubmit} className="rounded-2xl border bg-white p-6 grid gap-4" style={{ borderColor: BORDER }}>
//                 {err && (
//                   <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//                     {err}
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Tiêu đề</label>
//                   <input
//                     required
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2"
//                     style={{ borderColor: BORDER }}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Ảnh bìa (thumbnailUrl)</label>
//                     <input
//                       value={thumbnailUrl}
//                       onChange={(e) => setThumbnailUrl(e.target.value)}
//                       placeholder="https://…"
//                       className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2"
//                       style={{ borderColor: BORDER }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Tags (phân tách dấu phẩy)</label>
//                     <input
//                       value={tags}
//                       onChange={(e) => setTags(e.target.value)}
//                       placeholder="react,ux,js"
//                       className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2"
//                       style={{ borderColor: BORDER }}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Nội dung</label>
//                   <textarea
//                     required
//                     value={body}
//                     onChange={(e) => setBody(e.target.value)}
//                     rows={12}
//                     placeholder="Mỗi đoạn cách nhau 1 dòng trống…"
//                     className="w-full rounded-2xl border px-5 py-3 outline-none focus:ring-2"
//                     style={{ borderColor: BORDER }}
//                   />
//                   <div className="text-xs text-slate-500 mt-1">
//                     Nội dung sẽ được lưu vào <code>contentJson</code> dạng DraftJS blocks (mỗi đoạn → 1 block).
//                   </div>
//                 </div>

//                 <label className="inline-flex items-center gap-2">
//                   <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
//                   Công khai bài viết
//                 </label>

//                 <div className="flex items-center gap-2">
//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="rounded-full text-white px-5 py-3 transition disabled:opacity-60"
//                     style={{ backgroundColor: "#2563eb" }}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//                   >
//                     {saving ? "Đang lưu…" : (isEdit ? "Cập nhật" : "Đăng bài")}
//                   </button>
//                   <Link to="/blog" className="rounded-full border px-5 py-3 hover:bg-slate-50" style={{ borderColor: BORDER }}>
//                     Huỷ
//                   </Link>
//                 </div>
//               </form>
//             )}
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }















// src/pages/shared/BlogEditor.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import { isLoggedIn, requireAuth } from "../../utils/auth";
// import { useAuth } from "../../store/auth";
// import { http } from "../../utils/http";

// /* ===== Theme / Const ===== */
// const BORDER = "#e5e7eb";
// const BRAND = { primary: "#2563eb", hover: "#1d4ed8" };
// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

// /* ===== Token helpers (đồng bộ với Blog.jsx / BlogMy.jsx) ===== */
// function getAccessToken() {
//   try {
//     const t = JSON.parse(localStorage.getItem("auth_token") || "null");
//     if (t?.accessToken) return t.accessToken;
//   } catch {}
//   try {
//     const s = localStorage.getItem("access_token");
//     if (s) return s;
//   } catch {}
//   try {
//     const raw = localStorage.getItem("token");
//     if (raw) {
//       const j = JSON.parse(raw);
//       if (j?.accessToken) return j.accessToken;
//     }
//   } catch {}
//   return null;
// }
// function authHeaders(extra = {}) {
//   const token = getAccessToken();
//   return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
// }

// /* ===== Section wrapper ===== */
// const Section = ({ id, title, subtitle, children, action }) => (
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

// export default function BlogEditor() {
//   const { id } = useParams();              // id bài viết cần sửa
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { hydrate } = useAuth();

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [okMsg, setOkMsg] = useState("");

//   // Form state
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState(""); // chuỗi "a,b,c"
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [content, setContent] = useState(""); // map vào contentJson.blocks[0].text
//   const [isPublished, setIsPublished] = useState(true);

//   const canSave = useMemo(
//     () => title.trim().length >= 4 && content.trim().length >= 20,
//     [title, content]
//   );

//   // Guard đăng nhập
//   useEffect(() => {
//     hydrate?.();
//     if (!isLoggedIn()) {
//       requireAuth(navigate, location.pathname + location.search);
//       return;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Fetch chi tiết bài viết
// //   useEffect(() => {
// //     let ac = new AbortController();
// //     (async () => {
// //       setLoading(true);
// //       setError(null);
// //       setOkMsg("");
// //       try {
// //         const res = await http(`${API_BASE}/api/Posts/${id}`, {
// //           headers: authHeaders({ accept: "*/*" }),
// //           signal: ac.signal,
// //         });
// //         if (!res.ok) {
// //           let msg = `HTTP ${res.status}`;
// //           try {
// //             const j = await res.json();
// //             if (j?.message) msg = j.message;
// //           } catch {}
// //           throw new Error(msg);
// //         }
// //         const data = await res.json();
// //         // Map về form
// //         setTitle(data?.title || "");
// //         setTags((data?.tags || "").trim());
// //         setThumbnailUrl(data?.thumbnailUrl || "");
// //         setIsPublished(!!data?.isPublished);
// //         // contentJson là string JSON theo mẫu bạn đã gửi
// //         let initial = "";
// //         try {
// //           const parsed = typeof data?.contentJson === "string"
// //             ? JSON.parse(data.contentJson)
// //             : data?.contentJson;
// //           const blockText = parsed?.blocks?.[0]?.text ?? "";
// //           initial = String(blockText);
// //         } catch {
// //           initial = "";
// //         }
// //         setContent(initial);
// //       } catch (e) {
// //         setError(e?.message || "Không tải được bài viết");
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //     return () => ac.abort();
// //   }, [id]);

// //   async function save() {
// //     if (!canSave || saving) return;
// //     setSaving(true);
// //     setError(null);
// //     setOkMsg("");
// //     try {
// //       const body = {
// //         title: title.trim(),
// //         thumbnailUrl: thumbnailUrl.trim() || null,
// //         tags: (tags || "").trim(),
// //         contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
// //         isPublished: !!isPublished,
// //       };

// //       // API: PUT /api/Posts/{id} (đúng đặc tả bạn gửi)
// //       const res = await http(`${API_BASE}/api/Posts/${id}`, {
// //         method: "PUT",
// //         headers: authHeaders({ "Content-Type": "application/json", accept: "*/*" }),
// //         body: JSON.stringify(body),
// //       });

// //       if (!res.ok) {
// //         let msg = `HTTP ${res.status}`;
// //         try {
// //           const j = await res.json();
// //           if (j?.message) msg = j.message;
// //         } catch {}
// //         throw new Error(msg);
// //       }

// //       // OK → báo thành công và điều hướng về BlogMy
// //       setOkMsg("✅ Cập nhật thành công. Đang chuyển về danh sách bài viết của bạn…");
// //       setTimeout(() => navigate("/blog/my", { replace: true }), 800);
// //     } catch (e) {
// //       setError(e?.message || "Không cập nhật được bài viết");
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

//     // Fetch chi tiết bài viết
// useEffect(() => {
//   let ac = new AbortController();
//   (async () => {
//     setLoading(true);
//     setError(null);
//     setOkMsg("");
//     try {
//       const res = await http(`${API_BASE}/api/Posts/${id}`, {
//         headers: authHeaders({ accept: "*/*" }),
//         signal: ac.signal,
//       });
//       if (!res.ok) {
//         let msg = `HTTP ${res.status}`;
//         try {
//           const j = await res.json();
//           if (j?.message) msg = j.message;
//         } catch {}
//         throw new Error(msg);
//       }
//       const data = await res.json();
//       // ...map vào form như trước...
//     } catch (e) {
//      // nếu bị hủy thì bỏ qua
//      const msg = String(e?.message || "");
//      if (e?.name === "AbortError" || msg.toLowerCase().includes("aborted")) {
//        return;
//      }
//       setError(e?.message || "Không tải được bài viết");
//     } finally {
//       setLoading(false);
//     }
//   })();
//   return () => ac.abort();
// }, [id]);

// // Save
// async function save() {
//   if (!canSave || saving) return;
//   setSaving(true);
//   setError(null);
//   setOkMsg("");
//   try {
//     const body = {
//       title: title.trim(),
//       thumbnailUrl: thumbnailUrl.trim() || null,
//       tags: (tags || "").trim(),
//       contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
//       isPublished: !!isPublished,
//     };

//     const res = await http(`${API_BASE}/api/Posts/${id}`, {
//       method: "PUT",
//       headers: authHeaders({ "Content-Type": "application/json", accept: "*/*" }),
//       body: JSON.stringify(body),
//     });
//     if (!res.ok) {
//       let msg = `HTTP ${res.status}`;
//       try { const j = await res.json(); if (j?.message) msg = j.message; } catch {}
//       throw new Error(msg);
//     }

//     setOkMsg("✅ Cập nhật thành công. Đang chuyển về danh sách bài viết của bạn…");
//     setTimeout(() => navigate("/blog/my", { replace: true }), 800);
//   } catch (e) {
//    const msg = String(e?.message || "");
//    if (e?.name === "AbortError" || msg.toLowerCase().includes("aborted")) {
//      // không hiện lỗi nếu chỉ là abort
//      return;
//    }
//     setError(e?.message || "Không cập nhật được bài viết");
//   } finally {
//     setSaving(false);
//   }
// }

//   return (
//     <>
//       <Header />
//       <main className="w-screen overflow-x-hidden">
//         <Section
//           title="Chỉnh sửa bài viết"
//           subtitle={<span className="text-sm">ID: <code className="text-slate-500">{id}</code></span>}
//           action={
//             <div className="flex items-center gap-2">
//               <Link to="/blog/my" className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50">
//                 ← Quay lại “Bài viết của tôi”
//               </Link>
//               <button
//                 onClick={save}
//                 disabled={!canSave || saving}
//                 className={`rounded-full text-white px-4 py-2 text-sm font-semibold transition ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
//                 style={{ backgroundColor: BRAND.primary }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.hover)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
//               >
//                 {saving ? "Đang lưu…" : "Lưu thay đổi"}
//               </button>
//             </div>
//           }
//         >
//           {loading ? (
//             <div className="rounded-xl border bg-white p-6 text-slate-600" style={{ borderColor: BORDER }}>
//               Đang tải…
//             </div>
//           ) : (
//             <div className="bg-white border rounded-2xl p-5 grid gap-4" style={{ borderColor: BORDER }}>
//               {okMsg && (
//                 <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm px-4 py-3">
//                   {okMsg}
//                 </div>
//               )}
//               {error && (
//                 <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//                   {error}
//                 </div>
//               )}

//               <div>
//                 <label className="text-sm font-medium">Tiêu đề</label>
//                 <input
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
//                   style={{ borderColor: BORDER }}
//                   placeholder="Tiêu đề bài viết"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium">Tags (phân cách bằng dấu phẩy)</label>
//                   <input
//                     value={tags}
//                     onChange={(e) => setTags(e.target.value)}
//                     className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
//                     style={{ borderColor: BORDER }}
//                     placeholder="react, ui, tips"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">Ảnh bìa (thumbnailUrl)</label>
//                   <input
//                     value={thumbnailUrl}
//                     onChange={(e) => setThumbnailUrl(e.target.value)}
//                     className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
//                     style={{ borderColor: BORDER }}
//                     placeholder="https://…"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Nội dung</label>
//                 <textarea
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   rows={10}
//                   className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
//                   style={{ borderColor: BORDER }}
//                   placeholder="Viết nội dung chính…"
//                 />
//                 <div className="mt-2 text-xs text-slate-500">
//                   Lưu vào <code>contentJson</code> dạng <code>{"{ blocks: [{ text }] }"}</code>.
//                 </div>
//               </div>

//               <label className="inline-flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   className="accent-blue-600"
//                   checked={isPublished}
//                   onChange={(e) => setIsPublished(e.target.checked)}
//                 />
//                 Xuất bản (isPublished)
//               </label>

//               <div className="flex items-center justify-end gap-2 pt-2">
//                 <Link to="/blog/my" className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50">
//                   Huỷ
//                 </Link>
//                 <button
//                   onClick={save}
//                   disabled={!canSave || saving}
//                   className={`rounded-full text-white px-4 py-2 text-sm font-semibold transition ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
//                   style={{ backgroundColor: BRAND.primary }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.hover)}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
//                 >
//                   {saving ? "Đang lưu…" : "Lưu thay đổi"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </Section>
//       </main>
//       <Footer />
//     </>
//   );
// }


// src/pages/shared/BlogEditor.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";
import { isLoggedIn, requireAuth } from "../../utils/auth";

const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8" };
const BORDER = "#e5e7eb";
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

/* -------- util: lấy token từ localStorage (đa dạng key) -------- */
function getAccessTokenFromStorage() {
  try {
    const a = JSON.parse(localStorage.getItem("auth_token") || "null");
    if (a?.accessToken) return a.accessToken;
    if (typeof a === "string") return a; // phòng khi lưu thẳng chuỗi
  } catch {}
  try {
    const b = JSON.parse(localStorage.getItem("token") || "null");
    if (b?.accessToken) return b.accessToken;
  } catch {}
  try {
    const c = localStorage.getItem("access_token");
    if (c) return c;
  } catch {}
  return null;
}
function authHeaders(extra = {}) {
  const token = getAccessTokenFromStorage();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
}

/* -------- layout helper -------- */
const Section = ({ id, title, action, children }) => (
  <section id={id} className="w-screen overflow-x-hidden py-8 lg:py-10">
    <div className="w-screen px-6 lg:px-12">
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  </section>
);

/* -------- page -------- */
export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Guard: bắt buộc đăng nhập
  useEffect(() => {
    if (!isLoggedIn()) {
      requireAuth(navigate, `/blog/${id}/edit`);
    }
  }, [id, navigate]);

  // form state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState(""); // map vào contentJson.blocks[0].text
  const [isPublished, setIsPublished] = useState(true);

  const canSubmit = useMemo(
    () => title.trim().length >= 1 && content.trim().length >= 1,
    [title, content]
  );

  // nạp chi tiết bài viết
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await http(`${API_BASE}/api/Posts/${id}`, {
          headers: authHeaders({ accept: "*/*" }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const p = await res.json();

        setTitle(p?.title || "");
        setTags(p?.tags || "");
        setThumbnailUrl(p?.thumbnailUrl || "");
        setIsPublished(!!p?.isPublished);

        let text = "";
        if (p?.contentJson) {
          try {
            const cj = typeof p.contentJson === "string" ? JSON.parse(p.contentJson) : p.contentJson;
            text = cj?.blocks?.[0]?.text || "";
          } catch {
            text = "";
          }
        }
        setContent(text);
      } catch (e) {
        setError(e?.message || "Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // lưu
  const onSave = async () => {
    if (!canSubmit || saving) return;

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: title.trim(),
        contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
        thumbnailUrl: thumbnailUrl.trim() || null,
        tags: (tags || "").trim(),
        isPublished,
      };

      const res = await http(`${API_BASE}/api/Posts/${id}`, {
        method: "PUT",
        headers: authHeaders({
          "Content-Type": "application/json",
          accept: "*/*",
        }),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const j = await res.json();
          if (j?.message) msg = j.message;
        } catch {}
        throw new Error(msg);
      }

      // ok → về /blog/my
      navigate("/blog/my?ok=updated", { replace: true });
    } catch (e) {
      setError(e?.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <Section
          title="Chỉnh sửa bài viết"
          action={
            <div className="flex items-center gap-2">
              <Link
                to="/blog/my"
                className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
              >
                ← Quay lại “Bài viết của tôi”
              </Link>
              <button
                onClick={onSave}
                disabled={!canSubmit || saving}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
              >
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </button>
            </div>
          }
        >
          <div className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-slate-600">Đang tải dữ liệu…</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {/* ID hiển thị tham khảo */}
                <div className="text-xs text-slate-500">
                  ID: <span className="font-mono">{id}</span>
                </div>

                <div>
                  <label className="text-sm font-medium">Tiêu đề</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                    style={{ borderColor: BORDER }}
                    placeholder="Tiêu đề bài viết…"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Tags (phân cách bằng dấu phẩy)</label>
                    <input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                      style={{ borderColor: BORDER }}
                      placeholder="react, performance, ux…"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Ảnh bìa (thumbnailUrl)</label>
                    <input
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                      style={{ borderColor: BORDER }}
                      placeholder="https://…"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Nội dung</label>
                  <textarea
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                    style={{ borderColor: BORDER }}
                    placeholder="Nội dung (sẽ lưu vào contentJson.blocks[0].text)…"
                  />
                  <div className="mt-2 text-xs text-slate-500">
                    Sẽ gửi lên server ở dạng <code>contentJson</code> ={" "}
                    <code>{`{ "blocks": [{ "text": "<nội dung>" }] }`}</code>
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Xuất bản ngay (isPublished)
                </label>

                <div className="flex items-center justify-end gap-2">
                  <Link to="/blog/my" className="rounded-full border px-4 py-2 hover:bg-slate-50">
                    Hủy
                  </Link>
                  <button
                    onClick={onSave}
                    disabled={!canSubmit || saving}
                    className="rounded-full text-white px-4 py-2 font-semibold transition disabled:opacity-60"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    {saving ? "Đang lưu…" : "Lưu thay đổi"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
