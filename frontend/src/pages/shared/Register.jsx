



// // src/pages/Register.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useAuth } from "../../store/auth";
// import hero from "../../assets/image-1-Jbf5HJr8.png";

// // ===== Theme (đồng bộ toàn site)
// const BRAND = {
//   primary: "#2563eb",
//   primaryHover: "#1d4ed8",
//   ring: "#bfdbfe", // blue-200
// };

// const schema = z.object({
//   email: z.string().email("Email không hợp lệ"),
//   name: z.string().min(2, "Tài khoản phải từ 2 ký tự"),
//   password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
// });

// export default function Register() {
//   const [showPwd, setShowPwd] = useState(false);
//   const { user, register: signup, hydrate } = useAuth(); // dùng 'signup' để tránh đè 'register' của RHF
//   const nav = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setError,
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: { email: "", name: "", password: "" },
//     mode: "onBlur",
//   });

//   useEffect(() => { hydrate(); }, [hydrate]);
//   useEffect(() => { if (user) nav("/"); }, [user, nav]);

//   const onSubmit = async (data) => {
//     try {
//       await signup(data); // { name, email, password } theo store/auth
//       // Nếu flow của bạn KHÔNG tự login sau khi đăng ký, dùng dòng dưới:
//       // nav("/login", { replace: true });
//     } catch (e) {
//       setError("root", { message: e?.message || "Không thể tạo tài khoản. Vui lòng thử lại." });
//     }
//   };

//   return (
//     // FULL viewport trừ header (h-16 = 64px) + chặn tràn ngang
//     <section className="w-screen min-h-[calc(100vh-64px)] bg-white overflow-x-hidden grid place-items-center">
//       {/* Grid 2 cột full width, cân giữa */}
//       <div className="w-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 px-6 lg:px-12 py-8">
//         {/* LEFT: Ảnh minh họa (ẩn trên mobile) */}
//         <div className="hidden lg:block justify-self-end lg:-ml-6">
//           <img
//             src={hero}
//             alt="E-learning Illustration"
//             width={661}
//             height={583}
//             className="block max-w-[720px] w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
//           />
//         </div>

//         {/* RIGHT: Form */}
//         <div className="w-full max-w-[520px] justify-self-start">
//           {/* Heading + Tabs */}
//           <div className="mb-6">
//             <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">
//               Tạo tài khoản PTIT E-Learning
//             </h1>

//             <div className="mt-3 flex items-center gap-2">
//               <Link
//                 to="/login"
//                 className="rounded-full px-5 py-2 border transition"
//                 style={{ borderColor: BRAND.primary, color: BRAND.primary }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//               >
//                 Đăng nhập
//               </Link>
//               <button
//                 type="button"
//                 className="rounded-full px-5 py-2 text-white transition"
//                 style={{ backgroundColor: BRAND.primary }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
//               >
//                 Đăng ký
//               </button>
//             </div>

//             <p className="mt-4 text-sm text-gray-600">
//               Đăng ký để sử dụng đầy đủ tính năng và đồng bộ tiến độ học.
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//             {/* Lỗi tổng quát */}
//             {"root" in errors && errors.root?.message && (
//               <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//                 {errors.root.message}
//               </div>
//             )}

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium mb-1">Địa chỉ Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 inputMode="email"
//                 autoComplete="email"
//                 placeholder="nhap@email.com"
//                 className={`w-full rounded-full border px-5 py-3 outline-none focus:ring-2
//                   ${errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
//                 style={!errors.email ? { borderColor: BRAND.primary, boxShadow: `0 0 0 0 ${BRAND.ring}` } : {}}
//                 {...register("email")}
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//               />
//               {errors.email && (
//                 <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Tài khoản / name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium mb-1">Tài khoản</label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Nhập tài khoản của bạn"
//                 className={`w-full rounded-full border px-5 py-3 outline-none focus:ring-2
//                   ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
//                 style={!errors.name ? { borderColor: BRAND.primary } : {}}
//                 {...register("name")}
//                 aria-invalid={!!errors.name}
//                 aria-describedby={errors.name ? "name-error" : undefined}
//               />
//               {errors.name && (
//                 <p id="name-error" className="text-red-600 text-sm mt-1">{errors.name.message}</p>
//               )}
//             </div>

//             {/* Mật khẩu */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium mb-1">Mật khẩu</label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPwd ? "text" : "password"}
//                   autoComplete="new-password"
//                   placeholder="••••••••"
//                   className={`w-full rounded-full border px-5 py-3 pr-12 outline-none focus:ring-2
//                     ${errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
//                   style={!errors.password ? { borderColor: BRAND.primary } : {}}
//                   {...register("password")}
//                   aria-invalid={!!errors.password}
//                   aria-describedby={errors.password ? "password-error" : undefined}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPwd((s) => !s)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md focus:outline-none focus:ring-2"
//                   aria-label={showPwd ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
//                   style={{ boxShadow: `0 0 0 2px transparent` }}
//                 >
//                   {showPwd ? (
//                     // eye-off
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M3 3l18 18" />
//                       <path d="M10.73 5.08A10.94 10.94 0 0 1 12 5c7 0 10 7 10 7a15.66 15.66 0 0 1-3.24 4.33" />
//                       <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
//                       <path d="M6.12 6.12A15.66 15.66 0 0 0 2 12s3 7 10 7a10.94 10.94 0 0 0 3.46-.54" />
//                     </svg>
//                   ) : (
//                     // eye
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
//                       <circle cx="12" cy="12" r="3" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p id="password-error" className="text-red-600 text-sm mt-1">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full rounded-full text-white py-3 transition disabled:opacity-60 flex items-center justify-center gap-2"
//               style={{ backgroundColor: BRAND.primary }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
//             >
//               {isSubmitting && (
//                 <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.25" strokeWidth="4" />
//                   <path d="M21 12a9 9 0 0 0-9-9" stroke="white" strokeWidth="4" />
//                 </svg>
//               )}
//               {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
//             </button>

//             {/* CTA phụ */}
//             <p className="text-sm text-gray-600 text-center">
//               Đã có tài khoản?{" "}
//               <Link to="/login" style={{ color: BRAND.primary }} className="font-medium">
//                 Đăng nhập ngay
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../store/auth";
import hero from "../../assets/image-1-Jbf5HJr8.png";

const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8", ring: "#bfdbfe" };

// Schema: tối thiểu như yêu cầu API đăng ký
const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  name: z.string().min(2, "Tài khoản phải từ 2 ký tự"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),

  // Optional (để demo gọi /register-teacher)
  isTeacher: z.boolean().optional(),
  employeeCode: z.string().optional(),
  instruction: z.string().optional(),

  // Optional khác nếu sau này mở rộng UI
  dateOfBirth: z.string().optional(), // yyyy-mm-dd
  gender: z.string().optional(),
  remember: z.boolean().optional(),
});

export default function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const { user, register: signup, hydrate } = useAuth();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      remember: true,
      isTeacher: false,
      employeeCode: "",
      instruction: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur",
  });

  const isTeacher = watch("isTeacher");

  // useEffect(() => { hydrate(); }, [hydrate]);
  // useEffect(() => { if (user) nav("/"); }, [user, nav]);

  // const onSubmit = async (data) => {
  //   try {
  //     await signup({
  //       email: data.email,
  //       password: data.password,
  //       fullName: data.name,            // map đúng tên field API
  //       dateOfBirth: data.dateOfBirth || null,
  //       gender: data.gender || null,
  //       remember: !!data.remember,

  //       // phần giảng viên
  //       isTeacher: !!data.isTeacher,
  //       employeeCode: data.employeeCode?.trim(),
  //       instruction: data.instruction?.trim(),
  //     });
  //     // nếu muốn về trang login thay vì auto-login:
  //     // nav("/login", { replace: true });
  //   } catch (e) {
  //     setError("root", { message: e?.message || "Không thể tạo tài khoản. Vui lòng thử lại." });
  //   }
  // };

  useEffect(() => { hydrate(); }, [hydrate]);
   useEffect(() => { if (user) nav("/"); }, [user, nav]);

  const onSubmit = async (data) => {
  try {
    await signup({
      email: data.email,
      password: data.password,
      fullName: data.name,
      dateOfBirth: data.dateOfBirth || null,
      gender: data.gender || null,
      remember: !!data.remember,      // dùng cho lần login sau, không liên quan register
      isTeacher: !!data.isTeacher,    // nếu bạn còn gọi /register-teacher thì làm bước 2 riêng
      employeeCode: data.employeeCode?.trim(),
      instruction: data.instruction?.trim(),
    });

    // ✅ Không auto-login: chỉ điều hướng về Login + banner
    nav("/login", {
      replace: true,
      state: { justRegistered: true, email: data.email },
    });
  } catch (e) {
    setError("root", {
      message: e?.message || "Đăng ký không thành công. Vui lòng thử lại.",
    });
  }
};


  return (
    <section className="w-screen min-h-[calc(100vh-64px)] bg-white overflow-x-hidden grid place-items-center">
      <div className="w-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 px-6 lg:px-12 py-8">
        <div className="hidden lg:block justify-self-end lg:-ml-6">
          <img src={hero} alt="E-learning Illustration" width={661} height={583}
               className="block max-w-[720px] w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none" />
        </div>

        <div className="w-full max-w-[520px] justify-self-start">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">Tạo tài khoản PTIT E-Learning</h1>

            <div className="mt-3 flex items-center gap-2">
              <Link to="/login" className="rounded-full px-5 py-2 border transition"
                    style={{ borderColor: BRAND.primary, color: BRAND.primary }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                Đăng nhập
              </Link>
              <button type="button" className="rounded-full px-5 py-2 text-white transition"
                      style={{ backgroundColor: BRAND.primary }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}>
                Đăng ký
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-600">Đăng ký để sử dụng đầy đủ tính năng và đồng bộ tiến độ học.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {"root" in errors && errors.root?.message && (
              <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
                {errors.root.message}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Địa chỉ Email</label>
              <input
                id="email" type="email" inputMode="email" autoComplete="email" placeholder="nhap@email.com"
                className={`w-full rounded-full border px-5 py-3 outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                style={!errors.email ? { borderColor: BRAND.primary, boxShadow: `0 0 0 0 ${BRAND.ring}` } : {}}
                {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Tài khoản</label>
              <input
                id="name" type="text" placeholder="Nhập tài khoản của bạn"
                className={`w-full rounded-full border px-5 py-3 outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                style={!errors.name ? { borderColor: BRAND.primary } : {}}
                {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Mật khẩu</label>
              <div className="relative">
                <input
                  id="password" type={showPwd ? "text" : "password"} autoComplete="new-password" placeholder="••••••••"
                  className={`w-full rounded-full border px-5 py-3 pr-12 outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                  style={!errors.password ? { borderColor: BRAND.primary } : {}}
                  {...register("password")} aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md focus:outline-none focus:ring-2"
                        aria-label={showPwd ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"} style={{ boxShadow: `0 0 0 2px transparent` }}>
                  {showPwd ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l18 18" /><path d="M10.73 5.08A10.94 10.94 0 0 1 12 5c7 0 10 7 10 7a15.66 15.66 0 0 1-3.24 4.33" />
                      <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                      <path d="M6.12 6.12A15.66 15.66 0 0 0 2 12s3 7 10 7a10.94 10.94 0 0 0 3.46-.54" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p id="password-error" className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember */}
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-blue-600" {...register("remember")} />
              Ghi nhớ đăng nhập
            </label>

            {/* (Tuỳ chọn) Thông tin giảng viên */}
            <div className="rounded-xl border p-4">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-600" {...register("isTeacher")} />
                Đăng ký tài khoản giảng viên
              </label>

              {isTeacher && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Mã nhân viên</label>
                    <input
                      type="text" placeholder="VD: GV001"
                      className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                      {...register("employeeCode")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ghi chú / Hướng dẫn</label>
                    <input
                      type="text" placeholder="(tuỳ chọn)"
                      className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                      {...register("instruction")}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* (Optional) DOB & Gender nếu cần */}
            {/* 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                <input type="date" className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2 border-gray-300 focus:ring-blue-200" {...register("dateOfBirth")} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giới tính</label>
                <select className="w-full rounded-full border px-5 py-3 outline-none focus:ring-2 border-gray-300 focus:ring-blue-200" {...register("gender")}>
                  <option value="">-- Chọn --</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full text-white py-3 transition disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: BRAND.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
            >
              {isSubmitting && (
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="white" strokeWidth="4" />
                </svg>
              )}
              {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Đã có tài khoản?{" "}
              <Link to="/login" style={{ color: BRAND.primary }} className="font-medium">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
