// // src/pages/Login.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import hero from "../../assets/image-1-Jbf5HJr8.png";
// import {
//   isLoggedIn,
//   setTokens,
//   redirectBackAfterLogin,
//   consumePendingNext,
// } from "../../utils/auth";
// import { http } from "../../utils/http";

// const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8" };
// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

// const schema = z.object({
//   email: z.string().email("Email không hợp lệ"),
//   password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
// });

// export default function Login() {
//   const [showPwd, setShowPwd] = useState(false);
//   const nav = useNavigate();
//   const location = useLocation();

//   const params = new URLSearchParams(location.search);
//   const redirectQS = params.get("redirect");
//   const returnToQS = params.get("returnTo");
//   const fallbackAfterLogin = "/"; // hoặc "/exam"

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setError,
//   } = useForm({
//     resolver: zodResolver(schema),
//     mode: "onBlur",
//   });

//   // Nếu đã login mà vẫn vào /login → đá ra
//   useEffect(() => {
//     if (!isLoggedIn()) return;
//     const target = decodeURIComponent(redirectQS || returnToQS || "") || null;
//     if (target) nav(target, { replace: true });
//     else redirectBackAfterLogin(nav, fallbackAfterLogin);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [redirectQS, returnToQS]);

//   const onSubmit = async (form) => {
//     try {
//       const res = await http(`${API_BASE}/api/Auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", accept: "*/*" },
//         body: JSON.stringify({
//           email: form.email,
//           password: form.password,
//         }),
//       });

//       if (!res.ok) {
//         const errJson = await res.json().catch(() => ({}));
//         const msg = errJson?.message || "Email hoặc mật khẩu không đúng.";
//         setError("root", { message: msg });
//         return;
//       }

//       const data = await res.json();
//       // Chuẩn hoá key trả về từ backend
//       const accessToken = data?.accessToken || data?.token || data?.access_token;
//       const refreshToken = data?.refreshToken || data?.refresh_token;

//       if (!accessToken) {
//         setError("root", { message: "Phản hồi đăng nhập không hợp lệ (thiếu accessToken)." });
//         return;
//       }

//       setTokens({ accessToken, refreshToken });

//       // (tuỳ chọn) lưu user info nếu API /claims có
//       try {
//         localStorage.setItem("app_user", JSON.stringify({ email: form.email }));
//       } catch {}

//       // 1) redirect/returnTo từ URL
//       const targetQS = decodeURIComponent(redirectQS || returnToQS || "") || null;
//       if (targetQS) return nav(targetQS, { replace: true });

//       // 2) redirect đã lưu bởi requireAuth
//       const pending = consumePendingNext();
//       if (pending) return nav(pending, { replace: true });

//       // 3) fallback
//       nav(fallbackAfterLogin, { replace: true });
//     } catch (e) {
//       setError("root", { message: "Không thể kết nối máy chủ. Vui lòng thử lại." });
//     }
//   };

//   return (
//     <section className="w-screen min-h-[calc(100vh-64px)] bg-white overflow-x-hidden grid place-items-center">
//       <div className="w-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 px-6 lg:px-12 py-8">
//         {/* LEFT */}
//         <div className="hidden lg:block justify-self-end lg:-ml-6">
//           <img
//             src={hero}
//             alt="Minh hoạ E-learning"
//             width={661}
//             height={583}
//             className="block max-w-[720px] w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
//           />
//         </div>

//         {/* RIGHT */}
//         <div className="w-full max-w-[520px] justify-self-start">
//           <div className="mb-6">
//             <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">
//               Đăng nhập PTIT E-Learning
//             </h1>

//             <p className="mt-3 text-sm text-gray-600">
//               Đăng nhập để tiếp tục học, xem khoá đã mua và đồng bộ tiến độ.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//             {"root" in errors && errors.root?.message && (
//               <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//                 {errors.root.message}
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 placeholder="nhap@email.com"
//                 className={`w-full rounded-full border px-5 py-3 outline-none focus:ring-2 ${
//                   errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
//                 }`}
//                 style={!errors.email ? { borderColor: BRAND.primary } : {}}
//                 {...register("email")}
//               />
//               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium mb-1">Mật khẩu</label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPwd ? "text" : "password"}
//                   autoComplete="current-password"
//                   placeholder="••••••••"
//                   className={`w-full rounded-full border px-5 py-3 pr-12 outline-none focus:ring-2 ${
//                     errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
//                   }`}
//                   style={!errors.password ? { borderColor: BRAND.primary } : {}}
//                   {...register("password")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPwd(s => !s)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
//                 >
//                   {showPwd ? "🙈" : "👁️"}
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full rounded-full text-white py-3 transition disabled:opacity-60"
//               style={{ backgroundColor: BRAND.primary }}
//             >
//               {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
//             </button>

//             <p className="text-sm text-gray-600 text-center">
//               Chưa có tài khoản?{" "}
//               <Link to="/register" style={{ color: BRAND.primary }} className="font-medium">
//                 Tạo tài khoản ngay
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
























// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import hero from "../../assets/image-1-Jbf5HJr8.png";
import {
  isLoggedIn,
  setTokens,              // vẫn gọi để tương thích utils/auth hiện có
  redirectBackAfterLogin,
  consumePendingNext,
} from "../../utils/auth";
import { http } from "../../utils/http";

const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8" };
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectQS = params.get("redirect");
  const returnToQS = params.get("returnTo");
  const fallbackAfterLogin = "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // Nếu đã đăng nhập mà vào /login -> điều hướng đi
  useEffect(() => {
    if (!isLoggedIn()) return;
    const target = decodeURIComponent(redirectQS || returnToQS || "") || null;
    if (target) nav(target, { replace: true });
    else redirectBackAfterLogin(nav, fallbackAfterLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectQS, returnToQS]);

  const onSubmit = async (form) => {
    try {
      const res = await http(`${API_BASE}/api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "*/*" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const msg = errJson?.message || "Email hoặc mật khẩu không đúng.";
        setError("root", { message: msg });
        return;
      }

      const data = await res.json();
      // API của bạn trả: { token, refreshToken, userId, fullName, studentId, teacherId }
      // const accessToken  = data?.accessToken || data?.token || data?.access_token;
      // const refreshToken = data?.refreshToken || data?.refresh_token || null;

      // if (!accessToken) {
      //   setError("root", { message: "Phản hồi đăng nhập không hợp lệ (thiếu token)." });
      //   return;
      // }

      // // 1) Lưu theo utils/auth để các chỗ khác (nếu có) vẫn chạy
      // setTokens({ accessToken, refreshToken });

      // // 2) Lưu thêm object 'auth_user' chuẩn để Blog/MyBlog sử dụng
      // const authUser = {
      //   token: accessToken,
      //   refreshToken,
      //   userId: data?.userId || null,
      //   studentId: data?.studentId || null,
      //   teacherId: data?.teacherId || null,
      //   fullName: data?.fullName || form.email,
      //   email: form.email,
      // };
      // try {
      //   localStorage.setItem("auth_user", JSON.stringify(authUser));
      // } catch {}

      // ... lấy data từ API xong:
      const accessToken = data?.accessToken || data?.token || data?.access_token;
      const refreshToken = data?.refreshToken || data?.refresh_token;

      if (!accessToken) {
        setError("root", { message: "Phản hồi đăng nhập không hợp lệ (thiếu accessToken)." });
        return;
      }

      // 1) Lưu token (như bạn đang làm)
      setTokens({ accessToken, refreshToken });

      // 2) LƯU THÊM auth_user để trang Blog/MyBlog dùng memberId
      try {
        localStorage.setItem(
          "auth_user",
          JSON.stringify({
            token: accessToken,
            refreshToken,
            userId: data?.userId || null,
            studentId: data?.studentId || null,
            teacherId: data?.teacherId || null,
            fullName: data?.fullName || null,
          })
        );
      } catch {}


      // Điều hướng:
      const targetQS = decodeURIComponent(redirectQS || returnToQS || "") || null;
      if (targetQS) {
        nav(targetQS, { replace: true });
        return;
      }

      const pending = consumePendingNext();
      if (pending) {
        nav(pending, { replace: true });
        return;
      }

      nav(fallbackAfterLogin, { replace: true });
    } catch (e) {
      setError("root", { message: "Không thể kết nối máy chủ. Vui lòng thử lại." });
    }
  };

  return (
    <section className="w-screen min-h-[calc(100vh-64px)] bg-white overflow-x-hidden grid place-items-center">
      <div className="w-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 px-6 lg:px-12 py-8">
        {/* LEFT */}
        <div className="hidden lg:block justify-self-end lg:-ml-6">
          <img
            src={hero}
            alt="Minh hoạ E-learning"
            width={661}
            height={583}
            className="block max-w-[720px] w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
          />
        </div>

        {/* RIGHT */}
        <div className="w-full max-w-[520px] justify-self-start">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">
              Đăng nhập PTIT E-Learning
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Đăng nhập để tiếp tục học, xem khoá đã mua và đồng bộ tiến độ.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {"root" in errors && errors.root?.message && (
              <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
                {errors.root.message}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="nhap@email.com"
                className={`w-full rounded-full border px-5 py-3 outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
                style={!errors.email ? { borderColor: BRAND.primary } : {}}
                {...register("email")}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Mật khẩu</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full rounded-full border px-5 py-3 pr-12 outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
                  style={!errors.password ? { borderColor: BRAND.primary } : {}}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  aria-label={showPwd ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full text-white py-3 transition disabled:opacity-60"
              style={{ backgroundColor: BRAND.primary }}
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Chưa có tài khoản?{" "}
              <Link to="/register" style={{ color: BRAND.primary }} className="font-medium">
                Tạo tài khoản ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
