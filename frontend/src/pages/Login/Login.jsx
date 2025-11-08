import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../store/auth"; // đổi thành "../store/auth" nếu chưa set alias
import hero from "../../assets/image-1-Jbf5HJr8.png"; // đổi thành "../assets/..." nếu chưa set alias

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  remember: z.boolean().optional(),
});

function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const { user, login, hydrate } = useAuth();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { remember: false } });

  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => { if (user) nav("/"); }, [user, nav]);

  const onSubmit = async (data) => {
    await login({ email: data.email, password: data.password });
    // nếu cần "remember", bạn có thể lưu refresh token/cookie ở đây (mock tạm bỏ qua)
  };

  return (
    // FULL viewport trừ header (h-14 = 56px) + chặn tràn ngang
    <section className="w-screen min-h-[calc(100vh-56px)] bg-white overflow-x-hidden grid place-items-center">
      {/* Grid 2 cột full width, cân giữa */}
      <div className="w-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 px-6 lg:px-12">
        {/* LEFT: Ảnh (ẩn trên mobile). Nudge -ml để bù viền trắng của PNG */}
        <div className="hidden lg:block justify-self-end lg:-ml-6">
          <img
            src={hero}
            alt="E-learning Illustration"
            width={661}
            height={583}
            className="block max-w-[720px] w-full h-auto object-contain"
          />
        </div>

        {/* RIGHT: Form – cố định max-width, căn về trái cột phải */}
        <div className="w-full max-w-[520px] justify-self-start">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Chào mừng bạn đến với Elearning PTIT</h2>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                className="rounded-full px-5 py-2 text-white bg-[#54c3be] hover:opacity-95"
              >
                Đăng nhập
              </button>
              <Link
                to="/register"
                className="rounded-full px-5 py-2 text-[#54c3be] border border-[#54c3be] hover:bg-[#54c3be]/10"
              >
                Đăng ký
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Đăng nhập để sử dụng các chức năng
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Tài khoản</label>
              <input
                type="email"
                placeholder="Nhập tài khoản của bạn"
                className="w-full rounded-full border border-[#54c3be] px-5 py-3 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password + eye */}
            <div>
              <label className="block text-sm font-medium mb-1">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full rounded-full border border-[#54c3be] px-5 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  aria-label={showPwd ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                >
                  {showPwd ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l18 18" />
                      <path d="M10.73 5.08A10.94 10.94 0 0 1 12 5c7 0 10 7 10 7a15.66 15.66 0 0 1-3.24 4.33" />
                      <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                      <path d="M6.12 6.12A15.66 15.66 0 0 0 2 12s3 7 10 7a10.94 10.94 0 0 0 3.46-.54" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[#54c3be]" {...register("remember")} />
                Ghi nhớ đăng nhập
              </label>
              <Link to="#" className="text-sm text-gray-600 hover:text-[#54c3be]">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#54c3be] text-white py-3 hover:opacity-95 transition disabled:opacity-60"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;