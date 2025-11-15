// // src/pages/instructor/BecomeInstructor.jsx
// "use client";

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   GraduationCap, ArrowLeft, CheckCircle2, AlertTriangle, Loader2, ShieldCheck, RefreshCw,
// } from "lucide-react";

// const API_BASE = "http://localhost:5102/api";



// /**
//  * Luồng API:
//  * 1) POST  /api/Auth/register-teacher   body: { employeeCode, instruction }
//  * 2) POST  /api/Auth/login              (API của bạn trả về { token, userId, fullName, refreshToken, studentId, teacherId })
//  *    -> lấy refreshToken
//  * 3) POST  /api/Auth/refresh-token      body: { refreshToken }
//  *    -> data mới có teacherId != null
//  *
//  * Lưu ý:
//  * - Đoạn code dưới đây gọi login theo dạng POST không body.
//  *   Nếu backend của bạn yêu cầu email/password thì hãy bổ sung form hoặc lấy từ session hiện có.
//  */

// export default function BecomeInstructor() {
//   const [employeeCode, setEmployeeCode] = useState("");
//   const [instruction, setInstruction] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(0); // 0 idle, 1 register, 2 login, 3 refresh
//   const [error, setError] = useState("");

//   const [result, setResult] = useState(null); // dữ liệu cuối cùng sau refresh-token
//   const [loginData, setLoginData] = useState(null); // dữ liệu trả về ở bước login

//   // dùng để show thời điểm nâng cấp xong
//   const [completedAt, setCompletedAt] = useState(null);

//   const resetAll = () => {
//     setEmployeeCode("");
//     setInstruction("");
//     setLoading(false);
//     setStep(0);
//     setError("");
//     setResult(null);
//     setLoginData(null);
//     setCompletedAt(null);
//   };

//   const runFlow = async () => {
//     setError("");
//     setResult(null);
//     setLoginData(null);
//     setCompletedAt(null);
//     setLoading(true);

//     try {
//       // B1: register-teacher
//       setStep(1);
//       const regRes = await fetch(`${API_BASE}/Auth/register-teacher`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           employeeCode: employeeCode.trim(),
//           instruction: instruction.trim(),
//         }),
//       });
//       console.log(regRes);
//       if (!regRes.ok) {
//         const msg = await safeErr(regRes);
//         throw new Error(msg || `Register teacher failed (HTTP ${regRes.status})`);
//       }

//       // B2: login
//       setStep(2);
//       // Nếu backend yêu cầu credentials, thay body dưới đây tương ứng
//       const loginRes = await fetch(`${API_BASE}/Auth/login`, { method: "POST" });
//       if (!loginRes.ok) {
//         const msg = await safeErr(loginRes);
//         throw new Error(msg || `Login failed (HTTP ${loginRes.status})`);
//       }
//       const loginJson = await loginRes.json();
//       setLoginData(loginJson);

//       const refreshToken = loginJson?.refreshToken;
//       if (!refreshToken) {
//         throw new Error("Không nhận được refreshToken từ bước đăng nhập.");
//       }

//       // B3: refresh-token
//       setStep(3);
//       const refRes = await fetch(`${API_BASE}/Auth/refresh-token`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refreshToken }),
//       });
//       if (!refRes.ok) {
//         const msg = await safeErr(refRes);
//         throw new Error(msg || `Refresh token failed (HTTP ${refRes.status})`);
//       }
//       const refJson = await refRes.json();
//       setResult(refJson);
//       setCompletedAt(new Date());
//     } catch (e) {
//       setError(e.message || "Đã có lỗi xảy ra trong quá trình nâng cấp.");
//     } finally {
//       setLoading(false);
//       setStep(0);
//     }
//   };

//   useEffect(() => window.scrollTo(0, 0), []);

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />

//       {/* Hero */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <GraduationCap className="w-6 h-6 text-blue-700" />
//             <div>
//               <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tôi muốn làm giảng viên</h1>
//               <p className="text-gray-600">
//                 Nâng cấp vai trò từ học viên (student) lên giảng viên (teacher) bằng mã xác thực.
//               </p>
//             </div>
//           </div>
//           <Link to="/s/enrollments" className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1">
//             <ArrowLeft className="w-4 h-4" /> Về trang học tập
//           </Link>
//         </div>
//       </section>

//       {/* Main */}
//       <main className="w-full max-w-3xl mx-auto px-6 lg:px-0 py-8 space-y-8">
//         {/* Form */}
//         <div className="rounded-2xl border bg-white p-6 space-y-4">
//           <div>
//             <h2 className="text-lg font-bold text-gray-900">Nhập thông tin xác thực</h2>
//             <p className="text-sm text-gray-600">Vui lòng điền chính xác theo hướng dẫn của quản trị.</p>
//           </div>

//           <label className="grid gap-1">
//             <span className="text-sm font-medium text-gray-800">employeeCode</span>
//             <input
//               value={employeeCode}
//               onChange={(e) => setEmployeeCode(e.target.value)}
//               placeholder="CODE1"
//               className="rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//             />
//           </label>

//           <label className="grid gap-1">
//             <span className="text-sm font-medium text-gray-800">instruction</span>
//             <input
//               value={instruction}
//               onChange={(e) => setInstruction(e.target.value)}
//               placeholder="CODE2"
//               className="rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//             />
//           </label>

//           {error && (
//             <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 inline-flex items-start gap-2">
//               <AlertTriangle className="w-4 h-4 mt-0.5" />
//               <div>{error}</div>
//             </div>
//           )}

//           <div className="flex items-center gap-2">
//             <button
//               onClick={runFlow}
//               disabled={loading || !employeeCode.trim() || !instruction.trim()}
//               className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
//             >
//               {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
//               Nâng cấp thành giảng viên
//             </button>

//             <button
//               onClick={resetAll}
//               disabled={loading}
//               className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2"
//             >
//               <RefreshCw className="w-4 h-4" /> Làm mới
//             </button>
//           </div>

//           {/* Tiến trình nhỏ */}
//           {loading && (
//             <div className="text-xs text-gray-600">
//               {step === 1 && "Đang gửi /Auth/register-teacher…"}
//               {step === 2 && "Đang đăng nhập /Auth/login…"}
//               {step === 3 && "Đang làm mới token /Auth/refresh-token…"}
//             </div>
//           )}
//         </div>

//         {/* Kết quả */}
//         <div className="rounded-2xl border bg-white p-6 space-y-4">
//           <h3 className="text-sm font-bold text-gray-900">Kết quả nâng cấp</h3>

//           {!result ? (
//             <p className="text-sm text-gray-600">
//               Chưa có dữ liệu. Hãy bấm <b>Nâng cấp thành giảng viên</b> để chạy luồng API.
//             </p>
//           ) : (
//             <div className="space-y-3">
//               <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-sm">
//                 <CheckCircle2 className="w-4 h-4" />
//                 Đã nâng cấp thành công {completedAt ? `• ${completedAt.toLocaleTimeString()}` : ""}
//               </div>

//               <div className="grid sm:grid-cols-2 gap-3 text-sm">
//                 <InfoRow label="userId" value={result.userId || "—"} />
//                 <InfoRow label="fullName" value={result.fullName || "—"} />
//                 <InfoRow label="studentId" value={result.studentId || "—"} />
//                 <InfoRow
//                   label="teacherId"
//                   value={result.teacherId || "—"}
//                   highlight={Boolean(result.teacherId)}
//                 />
//               </div>

//               {/* Ẩn bớt token dài, nhưng vẫn có nút copy/debug nếu cần */}
//               <TokenRow label="token (mới)" value={result.token} />
//               <TokenRow label="refreshToken" value={result.refreshToken} />

//               {/* Thông tin từ bước login (để debug) */}
//               {loginData && (
//                 <details className="mt-2">
//                   <summary className="cursor-pointer text-sm text-gray-700">Chi tiết dữ liệu bước Login</summary>
//                   <pre className="mt-2 text-xs bg-gray-50 p-3 rounded-lg overflow-auto">
// {JSON.stringify(loginData, null, 2)}
//                   </pre>
//                 </details>
//               )}
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// /* ============ Small helpers ============ */

// function InfoRow({ label, value, highlight = false }) {
//   return (
//     <div className={`rounded-xl border p-3 ${highlight ? "border-emerald-200 bg-emerald-50" : ""}`}>
//       <div className="text-[11px] text-gray-500">{label}</div>
//       <div className="font-semibold text-gray-900 break-all">{String(value)}</div>
//     </div>
//   );
// }

// function TokenRow({ label, value }) {
//   if (!value) return null;
//   // để hiển thị gọn: 8 ký tự đầu + … + 6 ký tự cuối
//   const short = value.length > 20 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;
//   const onCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(value);
//       alert("Đã copy token vào clipboard.");
//     } catch {
//       alert("Không thể copy token.");
//     }
//   };
//   return (
//     <div className="rounded-xl border p-3 text-sm flex items-center justify-between gap-3">
//       <div className="min-w-0">
//         <div className="text-[11px] text-gray-500">{label}</div>
//         <div className="font-mono text-gray-900 break-all">{short}</div>
//       </div>
//       <button onClick={onCopy} className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
//         Copy
//       </button>
//     </div>
//   );
// }

// async function safeErr(res) {
//   try {
//     const t = await res.text();
//     if (!t) return "";
//     // cố gắng parse JSON error
//     try {
//       const j = JSON.parse(t);
//       return j?.message || j?.error || t;
//     } catch {
//       return t;
//     }
//   } catch {
//     return "";
//   }
// }

























// // src/pages/instructor/BecomeInstructor.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   GraduationCap, ArrowLeft, CheckCircle2, AlertTriangle, Loader2, ShieldCheck, RefreshCw,
// } from "lucide-react";
// import { isLoggedIn, authHeader, clearAllAuth } from "../../utils/auth";

// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102/api";

// /**
//  * Flow (yêu cầu đang đăng nhập):
//  * 1) POST  /api/Auth/register-teacher      (Authorization: Bearer <token>) body: { employeeCode, instruction }
//  * 2) POST  /api/Auth/login                 (tuỳ backend, có thể không cần header) -> lấy refreshToken
//  * 3) POST  /api/Auth/refresh-token         body: { refreshToken } -> nhận token mới + teacherId
//  */

// export default function BecomeInstructor() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ===== Guard: chỉ cho phép truy cập khi đã đăng nhập =====
//   useEffect(() => {
//     if (!isLoggedIn()) {
//       const redirect = encodeURIComponent(location.pathname + location.search);
//       navigate(`/login?redirect=${redirect}`, { replace: true });
//     }
//   }, [location.pathname, location.search, navigate]);

//   const [employeeCode, setEmployeeCode] = useState("");
//   const [instruction, setInstruction] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(0); // 0 idle, 1 register, 2 login, 3 refresh
//   const [error, setError] = useState("");

//   const [result, setResult] = useState(null);      // dữ liệu sau refresh-token
//   const [loginData, setLoginData] = useState(null); // dữ liệu từ bước login
//   const [completedAt, setCompletedAt] = useState(null);

//   const canSubmit = useMemo(
//     () => !!employeeCode.trim() && !!instruction.trim() && !loading,
//     [employeeCode, instruction, loading]
//   );

//   const resetAll = () => {
//     setEmployeeCode("");
//     setInstruction("");
//     setLoading(false);
//     setStep(0);
//     setError("");
//     setResult(null);
//     setLoginData(null);
//     setCompletedAt(null);
//   };

//   const handleUnauthorized = () => {
//     // Token hết hạn hoặc không hợp lệ -> đăng xuất & yêu cầu đăng nhập lại
//     clearAllAuth?.();
//     const redirect = encodeURIComponent(location.pathname + location.search);
//     navigate(`/login?redirect=${redirect}`, { replace: true });
//   };

//   const runFlow = async () => {
//     setError("");
//     setResult(null);
//     setLoginData(null);
//     setCompletedAt(null);
//     setLoading(true);

//     try {
//       // ===== B1: register-teacher (cần Authorization) =====
//       setStep(1);
//       const regRes = await fetch(`${API_BASE}/Auth/register-teacher`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...authHeader(), // <<—— quan trọng để tránh 401
//         },
//         body: JSON.stringify({
//           employeeCode: employeeCode.trim(),
//           instruction: instruction.trim(),
//         }),
//         mode: "cors",
//       });

//       if (regRes.status === 401) return handleUnauthorized();
//       if (!regRes.ok) throw new Error(await safeErr(regRes) || `Register teacher failed (HTTP ${regRes.status})`);

//       // ===== B2: login (tuỳ backend; nếu yêu cầu email/password thì cần sửa lại body cho phù hợp) =====
//       setStep(2);
//       const loginRes = await fetch(`${API_BASE}/Auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         mode: "cors",
//       });
//       if (loginRes.status === 401) return handleUnauthorized();
//       if (!loginRes.ok) throw new Error(await safeErr(loginRes) || `Login failed (HTTP ${loginRes.status})`);
//       const loginJson = await loginRes.json();
//       setLoginData(loginJson);

//       const refreshToken = loginJson?.refreshToken;
//       if (!refreshToken) throw new Error("Không nhận được refreshToken từ bước đăng nhập.");

//       // ===== B3: refresh-token =====
//       setStep(3);
//       const refRes = await fetch(`${API_BASE}/Auth/refresh-token`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refreshToken }),
//         mode: "cors",
//       });
//       if (refRes.status === 401) return handleUnauthorized();
//       if (!refRes.ok) throw new Error(await safeErr(refRes) || `Refresh token failed (HTTP ${refRes.status})`);

//       const refJson = await refRes.json();
//       setResult(refJson);
//       setCompletedAt(new Date());
//     } catch (e) {
//       // Hiển thị lỗi CORS dễ hiểu hơn
//       const msg = String(e?.message || e || "");
//       if (msg.includes("CORS")) {
//         setError(
//           "CORS bị chặn. Hãy bật CORS trên API (AllowOrigin http://localhost:5173) và chắc chắn endpoint tồn tại (/api/Auth/register-teacher)."
//         );
//       } else {
//         setError(msg || "Đã có lỗi xảy ra trong quá trình nâng cấp.");
//       }
//     } finally {
//       setLoading(false);
//       setStep(0);
//     }
//   };

//   useEffect(() => window.scrollTo(0, 0), []);

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />

//       {/* Hero */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <GraduationCap className="w-6 h-6 text-blue-700" />
//             <div>
//               <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tôi muốn làm giảng viên</h1>
//               <p className="text-gray-600">
//                 Nâng cấp vai trò từ học viên (student) lên giảng viên (teacher) bằng mã xác thực.
//               </p>
//             </div>
//           </div>
//           <Link to="/s/enrollments" className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1">
//             <ArrowLeft className="w-4 h-4" /> Về trang học tập
//           </Link>
//         </div>
//       </section>

//       {/* Main */}
//       <main className="w-full max-w-3xl mx-auto px-6 lg:px-0 py-8 space-y-8">
//         {/* Form */}
//         <div className="rounded-2xl border bg-white p-6 space-y-4">
//           <div>
//             <h2 className="text-lg font-bold text-gray-900">Nhập thông tin xác thực</h2>
//             <p className="text-sm text-gray-600">Vui lòng điền chính xác theo hướng dẫn của quản trị.</p>
//           </div>

//           <label className="grid gap-1">
//             <span className="text-sm font-medium text-gray-800">employeeCode</span>
//             <input
//               value={employeeCode}
//               onChange={(e) => setEmployeeCode(e.target.value)}
//               placeholder="CODE1"
//               className="rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//             />
//           </label>

//           <label className="grid gap-1">
//             <span className="text-sm font-medium text-gray-800">instruction</span>
//             <input
//               value={instruction}
//               onChange={(e) => setInstruction(e.target.value)}
//               placeholder="CODE2"
//               className="rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
//             />
//           </label>

//           {error && (
//             <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 inline-flex items-start gap-2">
//               <AlertTriangle className="w-4 h-4 mt-0.5" />
//               <div>{error}</div>
//             </div>
//           )}

//           <div className="flex items-center gap-2">
//             <button
//               onClick={runFlow}
//               disabled={!canSubmit}
//               className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
//             >
//               {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
//               Nâng cấp thành giảng viên
//             </button>

//             <button
//               onClick={resetAll}
//               disabled={loading}
//               className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2"
//             >
//               <RefreshCw className="w-4 h-4" /> Làm mới
//             </button>
//           </div>

//           {/* Tiến trình nhỏ */}
//           {loading && (
//             <div className="text-xs text-gray-600">
//               {step === 1 && "Đang gửi /Auth/register-teacher…"}
//               {step === 2 && "Đang đăng nhập /Auth/login…"}
//               {step === 3 && "Đang làm mới token /Auth/refresh-token…"}
//             </div>
//           )}
//         </div>

//         {/* Kết quả */}
//         <div className="rounded-2xl border bg-white p-6 space-y-4">
//           <h3 className="text-sm font-bold text-gray-900">Kết quả nâng cấp</h3>

//           {!result ? (
//             <p className="text-sm text-gray-600">
//               Chưa có dữ liệu. Hãy bấm <b>Nâng cấp thành giảng viên</b> để chạy luồng API.
//             </p>
//           ) : (
//             <div className="space-y-3">
//               <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-sm">
//                 <CheckCircle2 className="w-4 h-4" />
//                 Đã nâng cấp thành công {completedAt ? `• ${completedAt.toLocaleTimeString()}` : ""}
//               </div>

//               <div className="grid sm:grid-cols-2 gap-3 text-sm">
//                 <InfoRow label="userId" value={result.userId || "—"} />
//                 <InfoRow label="fullName" value={result.fullName || "—"} />
//                 <InfoRow label="studentId" value={result.studentId || "—"} />
//                 <InfoRow label="teacherId" value={result.teacherId || "—"} highlight={Boolean(result.teacherId)} />
//               </div>

//               <TokenRow label="token (mới)" value={result.token} />
//               <TokenRow label="refreshToken" value={result.refreshToken} />

//               {loginData && (
//                 <details className="mt-2">
//                   <summary className="cursor-pointer text-sm text-gray-700">Chi tiết dữ liệu bước Login</summary>
//                   <pre className="mt-2 text-xs bg-gray-50 p-3 rounded-lg overflow-auto">
// {JSON.stringify(loginData, null, 2)}
//                   </pre>
//                 </details>
//               )}
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// /* ============ Small helpers ============ */

// function InfoRow({ label, value, highlight = false }) {
//   return (
//     <div className={`rounded-xl border p-3 ${highlight ? "border-emerald-200 bg-emerald-50" : ""}`}>
//       <div className="text-[11px] text-gray-500">{label}</div>
//       <div className="font-semibold text-gray-900 break-all">{String(value)}</div>
//     </div>
//   );
// }

// function TokenRow({ label, value }) {
//   if (!value) return null;
//   const short = value.length > 20 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;
//   const onCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(value);
//       alert("Đã copy token vào clipboard.");
//     } catch {
//       alert("Không thể copy token.");
//     }
//   };
//   return (
//     <div className="rounded-xl border p-3 text-sm flex items-center justify-between gap-3">
//       <div className="min-w-0">
//         <div className="text-[11px] text-gray-500">{label}</div>
//         <div className="font-mono text-gray-900 break-all">{short}</div>
//       </div>
//       <button onClick={onCopy} className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
//         Copy
//       </button>
//     </div>
//   );
// }

// async function safeErr(res) {
//   try {
//     const t = await res.text();
//     if (!t) return "";
//     try {
//       const j = JSON.parse(t);
//       return j?.message || j?.error || t;
//     } catch {
//       return t;
//     }
//   } catch {
//     return "";
//   }
// }









































// src/pages/instructor/BecomeInstructor.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  GraduationCap, ArrowLeft, CheckCircle2, AlertTriangle, Loader2, ShieldCheck, RefreshCw,
} from "lucide-react";
import {
  isLoggedIn,
  authHeader,
  clearAllAuth,
  getRefreshToken,
  setTokens,
} from "../../utils/auth";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102/api";

/**
 * Flow (yêu cầu đang đăng nhập):
 * 1) POST  /api/Auth/register-teacher      (Authorization: Bearer <token>) body: { employeeCode, instruction }
 * 2) POST  /api/Auth/refresh-token         body: { refreshToken (đang lưu trong localStorage) }
 *    -> nhận token mới + teacherId, đồng thời cập nhật lại access/refresh token vào localStorage
 */

export default function BecomeInstructor() {
  const navigate = useNavigate();
  const location = useLocation();

  // ===== Guard: chỉ cho phép truy cập khi đã đăng nhập =====
  useEffect(() => {
    if (!isLoggedIn()) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirect}`, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  const [employeeCode, setEmployeeCode] = useState("");
  const [instruction, setInstruction] = useState("");

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0 idle, 1 register, 2 refresh
  const [error, setError] = useState("");

  const [result, setResult] = useState(null);       // dữ liệu sau refresh-token
  const [completedAt, setCompletedAt] = useState(null);

  const canSubmit = useMemo(
    () => !!employeeCode.trim() && !!instruction.trim() && !loading,
    [employeeCode, instruction, loading]
  );

  const resetAll = () => {
    setEmployeeCode("");
    setInstruction("");
    setLoading(false);
    setStep(0);
    setError("");
    setResult(null);
    setCompletedAt(null);
  };

  const handleUnauthorized = () => {
    // Token hết hạn hoặc không hợp lệ -> đăng xuất & yêu cầu đăng nhập lại
    clearAllAuth?.();
    const redirect = encodeURIComponent(location.pathname + location.search);
    navigate(`/login?redirect=${redirect}`, { replace: true });
  };

  const runFlow = async () => {
    setError("");
    setResult(null);
    setCompletedAt(null);
    setLoading(true);

    try {
      // ===== B1: register-teacher (cần Authorization) =====
      setStep(1);
      const regRes = await fetch(`${API_BASE}/Auth/register-teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(), // <<—— quan trọng để tránh 401
        },
        body: JSON.stringify({
          employeeCode: employeeCode.trim(),
          instruction: instruction.trim(),
        }),
        mode: "cors",
      });

      if (regRes.status === 401) return handleUnauthorized();
      if (!regRes.ok) throw new Error(await safeErr(regRes) || `Register teacher failed (HTTP ${regRes.status})`);

      // ===== B2: refresh-token bằng refreshToken đang lưu =====
      const storedRefresh = getRefreshToken();
      if (!storedRefresh) {
        throw new Error("Không tìm thấy refreshToken trong trình duyệt. Vui lòng đăng nhập lại rồi thử nâng cấp.");
      }

      setStep(2);
      const refRes = await fetch(`${API_BASE}/Auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: storedRefresh }),
        mode: "cors",
      });
      if (refRes.status === 401) return handleUnauthorized();
      if (!refRes.ok) throw new Error(await safeErr(refRes) || `Refresh token failed (HTTP ${refRes.status})`);

      const refJson = await refRes.json();

      // Ghi lại token mới vào localStorage để phiên FE cập nhật ngay
      setTokens({
        accessToken: refJson?.token,
        refreshToken: refJson?.refreshToken,
      });

      setResult(refJson);
      setCompletedAt(new Date());

      // 813-829
       // Cập nhật app_user để Header thấy ngay teacherId
       try {
         const cur = JSON.parse(localStorage.getItem("app_user") || "null") || {};
           const next = {
             ...cur,
             userId: refJson.userId ?? cur.userId ?? null,
             fullName: refJson.fullName ?? cur.fullName ?? cur.name ?? "User",
             name: refJson.fullName ?? cur.name ?? "User",
           studentId: refJson.studentId ?? cur.studentId ?? null,
             teacherId: refJson.teacherId ?? cur.teacherId ?? null,
             roles: Array.isArray(cur.roles) ? cur.roles : [],
           };
           localStorage.setItem("app_user", JSON.stringify(next));
           // Cho Header cập nhật ngay ở cùng tab
           window.dispatchEvent(new Event("app_user_updated"));
         } catch {}
    } catch (e) {
      const msg = String(e?.message || e || "");
      if (msg.toLowerCase().includes("cors")) {
        setError(
          "CORS bị chặn. Hãy bật CORS trên API (AllowOrigin http://localhost:5173) và chắc chắn endpoint tồn tại (/api/Auth/register-teacher)."
        );
      } else {
        setError(msg || "Đã có lỗi xảy ra trong quá trình nâng cấp.");
      }
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-blue-700" />
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tôi muốn làm giảng viên</h1>
              <p className="text-gray-600">
                Nâng cấp vai trò từ học viên (student) lên giảng viên (teacher) bằng mã xác thực.
              </p>
            </div>
          </div>
          <Link to="/s/enrollments" className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Về trang học tập
          </Link>
        </div>
      </section>

      {/* Main */}
      <main className="w-full max-w-3xl mx-auto px-6 lg:px-0 py-8 space-y-8">
        {/* Form */}
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Nhập thông tin xác thực</h2>
            <p className="text-sm text-gray-600">Vui lòng điền chính xác theo hướng dẫn của quản trị.</p>
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-gray-800">employeeCode</span>
            <input
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              placeholder="CODE1"
              className="rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-gray-800">instruction</span>
            <input
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="CODE2"
              className="rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </label>

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 inline-flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={runFlow}
              disabled={!canSubmit}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Nâng cấp thành giảng viên
            </button>

            <button
              onClick={resetAll}
              disabled={loading}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Làm mới
            </button>
          </div>

          {/* Tiến trình nhỏ */}
          {loading && (
            <div className="text-xs text-gray-600">
              {step === 1 && "Đang gửi /Auth/register-teacher…"}
              {step === 2 && "Đang làm mới token /Auth/refresh-token…"}
            </div>
          )}
        </div>

        {/* Kết quả */}
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Kết quả nâng cấp</h3>

          {!result ? (
            <p className="text-sm text-gray-600">
              Chưa có dữ liệu. Hãy bấm <b>Nâng cấp thành giảng viên</b> để chạy luồng API.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Đã nâng cấp thành công {completedAt ? `• ${completedAt.toLocaleTimeString()}` : ""}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <InfoRow label="userId" value={result.userId || "—"} />
                <InfoRow label="fullName" value={result.fullName || "—"} />
                <InfoRow label="studentId" value={result.studentId || "—"} />
                <InfoRow label="teacherId" value={result.teacherId || "—"} highlight={Boolean(result.teacherId)} />
              </div>

              <TokenRow label="token (mới)" value={result.token} />
              <TokenRow label="refreshToken" value={result.refreshToken} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ============ Small helpers ============ */

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className={`rounded-xl border p-3 ${highlight ? "border-emerald-200 bg-emerald-50" : ""}`}>
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="font-semibold text-gray-900 break-all">{String(value)}</div>
    </div>
  );
}

function TokenRow({ label, value }) {
  if (!value) return null;
  const short = value.length > 20 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Đã copy token vào clipboard.");
    } catch {
      alert("Không thể copy token.");
    }
  };
  return (
    <div className="rounded-xl border p-3 text-sm flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[11px] text-gray-500">{label}</div>
        <div className="font-mono text-gray-900 break-all">{short}</div>
      </div>
      <button onClick={onCopy} className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
        Copy
      </button>
    </div>
  );
}

async function safeErr(res) {
  try {
    const t = await res.text();
    if (!t) return "";
    try {
      const j = JSON.parse(t);
      return j?.message || j?.error || t;
    } catch {
      return t;
    }
  } catch {
    return "";
  }
}
