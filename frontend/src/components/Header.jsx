// // src/components/Header.jsx
// "use client";

// import { Link, NavLink } from "react-router-dom";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useAuth } from "../store/auth";

// // ✅ thay bằng file của bạn
// import logo from "../assets/logo-ptit-logo-1.png";
// import avatarFallback from "../assets/logo-ptit-logo-1.png";

// // util: class cho NavLink
// const linkCls = ({ isActive }) =>
//   "px-4 py-2 text-[15px] font-medium transition " +
//   (isActive ? "text-[#54c3be]" : "text-neutral-900 hover:text-[#54c3be]");

// export default function Header({
//   className = "",
//   brand = { name: "Elearning", abbr: "P", href: "/" },
//   // có thể override routes ở mỗi page nếu cần
//   routes = [
//     { to: "/", label: "Trang chủ", end: true },
//     { to: "/courses", label: "Khóa học" },
//     { to: "/dashboard", label: "Dashboard" },
//     { to: "/blog", label: "Blog" },
//     { to: "/about", label: "About Us" },
//     { to: "/membership", label: "MemberShip" },
//     { to: "/payment", label: "Payment" },
//   ],
// }) {
//   const { user, hydrate, logout } = useAuth();
//   const [openUser, setOpenUser] = useState(false);
//   const [openMobile, setOpenMobile] = useState(false);
//   const menuRef = useRef(null);

//   const navItems = useMemo(() => routes ?? [], [routes]);

//   useEffect(() => {
//     hydrate();
//   }, [hydrate]);

//   // click-outside cho dropdown user
//   useEffect(() => {
//     const onClick = (e) => {
//       if (!menuRef.current) return;
//       if (!menuRef.current.contains(e.target)) setOpenUser(false);
//     };
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   return (
//     <header className={`w-full bg-neutral-100 border-b ${className}`}>
//       <div className="w-full h-16 px-6 lg:px-12 flex items-center gap-4">
//         {/* Logo trái */}
//         <Link to={brand.href || "/"} className="flex items-center gap-2 shrink-0">
//           <img src={logo} alt={brand.name || "Logo"} className="h-10 w-auto object-contain" />
//           {/* thêm chữ nếu muốn */}
//           {/* <span className="font-bold">{brand.name || "Elearning"}</span> */}
//         </Link>

//         {/* Menu giữa (ẩn trên mobile) */}
//         <nav className="hidden md:flex flex-1 justify-center items-center gap-2">
//           {navItems.map((r) => (
//             <NavLink key={r.to} to={r.to} end={!!r.end} className={linkCls}>
//               {r.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Mobile hamburger */}
//         <button
//           className="md:hidden ml-auto p-2"
//           onClick={() => setOpenMobile((s) => !s)}
//           aria-label="Mở menu"
//           type="button"
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
//           </svg>
//         </button>

//         {/* User bên phải (desktop) */}
//         <div className="hidden md:flex items-center gap-3 relative" ref={menuRef}>
//           {user ? (
//             <>
//               <img
//                 src={user.avatar || avatarFallback}
//                 alt={user.name || "user"}
//                 className="h-9 w-9 rounded-full object-cover"
//               />
//               <button
//                 onClick={() => setOpenUser((s) => !s)}
//                 className="flex items-center gap-1 text-[15px] font-medium"
//                 type="button"
//               >
//                 {user.name || "Luân"}
//                 <svg width="18" height="18" viewBox="0 0 24 24">
//                   <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
//                 </svg>
//               </button>

//               {/* Dropdown */}
//               {openUser && (
//                 <div className="absolute right-0 top-12 w-56 rounded-xl border bg-white shadow-md overflow-hidden">
//                   <Link to="/profile" className="block px-4 py-2 hover:bg-slate-50">
//                     Hồ sơ cá nhân
//                   </Link>
//                   <Link to="/my-courses" className="block px-4 py-2 hover:bg-slate-50">
//                     Khóa học của tôi
//                   </Link>
//                   <Link to="/settings" className="block px-4 py-2 hover:bg-slate-50">
//                     Cài đặt
//                   </Link>
//                   <button
//                     onClick={logout}
//                     className="w-full text-left px-4 py-2 hover:bg-slate-50"
//                     type="button"
//                   >
//                     Đăng xuất
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <NavLink to="/login" className="px-4 py-2 text-[15px]">
//                 Đăng nhập
//               </NavLink>
//               <Link
//                 to="/register"
//                 className="rounded-full bg-[#54c3be] text-white px-4 py-2 text-[15px] hover:opacity-95"
//               >
//                 Đăng ký
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Mobile menu (full-width) */}
//       {openMobile && (
//         <div className="md:hidden w-full border-t bg-white">
//           <nav className="px-6 py-4 flex flex-col gap-2">
//             {navItems.map((r) => (
//               <NavLink
//                 key={r.to}
//                 to={r.to}
//                 end={!!r.end}
//                 className={linkCls}
//                 onClick={() => setOpenMobile(false)}
//               >
//                 {r.label}
//               </NavLink>
//             ))}

//             <div className="h-px bg-slate-200 my-2" />

//             {user ? (
//               <>
//                 <Link to="/profile" className={linkCls} onClick={() => setOpenMobile(false)}>
//                   Hồ sơ cá nhân
//                 </Link>
//                 <Link to="/my-courses" className={linkCls} onClick={() => setOpenMobile(false)}>
//                   Khóa học của tôi
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setOpenMobile(false);
//                     logout();
//                   }}
//                   className="text-left px-4 py-2 text-[15px]"
//                   type="button"
//                 >
//                   Đăng xuất
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavLink to="/login" className={linkCls} onClick={() => setOpenMobile(false)}>
//                   Đăng nhập
//                 </NavLink>
//                 <NavLink to="/register" className={linkCls} onClick={() => setOpenMobile(false)}>
//                   Đăng ký
//                 </NavLink>
//               </>
//             )}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }




// src/components/Header.jsx
"use client";

import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { useAuth } from "../store/auth";

// ✅ thay bằng file của bạn
import logo from "../assets/logo-ptit-logo-1.png";
import avatarFallback from "../assets/logo-ptit-logo-1.png";

// ===== Theme =====
const BRAND = {
  primary: "#2563eb", // xanh chủ đạo
  primaryHover: "#1d4ed8",
  ring: "#93c5fd",
};

// util: class cho NavLink (active = xanh + gạch chân)
const linkCls = ({ isActive }) =>
  `px-4 py-2 text-[15px] font-medium transition
   ${isActive
     ? `text-[${BRAND.primary}] underline underline-offset-4 decoration-2`
     : `text-neutral-900 hover:text-[${BRAND.primary}]`}`;

export default function Header({
  className = "",
  brand = { name: "Elearning", abbr: "P", href: "/" },
  // có thể override routes ở mỗi page nếu cần
  routes = [
    { to: "/", label: "Trang chủ", end: true },
    { to: "/courses", label: "Khóa học" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "Giới thiệu" },
    { to: "/membership", label: "Gói thành viên" },
    { to: "/payment", label: "Thanh toán" },
  ],
}) {
  const { user, hydrate, logout } = useAuth();
  const [openUser, setOpenUser] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const menuRef = useRef(null);

  const navItems = useMemo(() => routes ?? [], [routes]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // click-outside cho dropdown user
  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpenUser(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className={`w-full bg-white border-b ${className}`}>
      <div className="w-full h-16 px-6 lg:px-12 flex items-center gap-4">
        {/* Logo trái */}
        <Link
          to={brand.href || "/"}
          className="flex items-center gap-2 shrink-0 focus:outline-none"
          aria-label="Trang chủ"
        >
          <img src={logo} alt={brand.name || "Logo"} className="h-10 w-auto object-contain" />
          {/* <span className="font-bold">{brand.name || "Elearning"}</span> */}
        </Link>

        {/* Menu giữa (ẩn trên mobile) */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-2">
          {navItems.map((r) => (
            <NavLink key={r.to} to={r.to} end={!!r.end} className={linkCls}>
              {r.label}
            </NavLink>
          ))}
        </nav>

        {/* User bên phải (desktop) */}
        <div className="hidden md:flex items-center gap-3 relative" ref={menuRef}>
          {user ? (
            <>
              <img
                src={user.avatar || avatarFallback}
                alt={user.name || "user"}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <button
                onClick={() => setOpenUser((s) => !s)}
                className={`flex items-center gap-1 text-[15px] font-medium focus:outline-none focus:ring-2`}
                style={{ color: "#111827", boxShadow: `0 0 0 2px transparent` }}
                type="button"
              >
                {user.name || "Luân"}
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>

              {/* Dropdown */}
              {openUser && (
                <div className="absolute right-0 top-12 w-56 rounded-xl border bg-white shadow-md overflow-hidden">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-slate-50">
                    Hồ sơ cá nhân
                  </Link>
                  <Link to="/my-courses" className="block px-4 py-2 hover:bg-slate-50">
                    Khóa học của tôi
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-slate-50">
                    Cài đặt
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50"
                    type="button"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-4 py-2 text-[15px] hover:text-[#2563eb]">
                Đăng nhập
              </NavLink>
              <Link
                to="/register"
                className="rounded-full text-white px-4 py-2 text-[15px] transition focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: BRAND.primary,
                  boxShadow: `0 0 0 2px transparent`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 rounded-lg focus:outline-none focus:ring-2"
          onClick={() => setOpenMobile((s) => !s)}
          aria-label="Mở menu"
          type="button"
          style={{ boxShadow: `0 0 0 2px transparent` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile menu (full-width) */}
      {openMobile && (
        <div className="md:hidden w-full border-t bg-white">
          <nav className="px-6 py-4 flex flex-col gap-2">
            {navItems.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                end={!!r.end}
                className={({ isActive }) =>
                  `px-4 py-2 text-[15px] font-medium rounded-md transition ${
                    isActive
                      ? `bg-[${BRAND.primary}]/10 text-[${BRAND.primary}]`
                      : `text-neutral-900 hover:bg-slate-50 hover:text-[${BRAND.primary}]`
                  }`
                }
                onClick={() => setOpenMobile(false)}
              >
                {r.label}
              </NavLink>
            ))}

            <div className="h-px bg-slate-200 my-2" />

            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`px-4 py-2 text-[15px] rounded-md hover:bg-slate-50 hover:text-[${BRAND.primary}]`}
                  onClick={() => setOpenMobile(false)}
                >
                  Hồ sơ cá nhân
                </Link>
                <Link
                  to="/my-courses"
                  className={`px-4 py-2 text-[15px] rounded-md hover:bg-slate-50 hover:text-[${BRAND.primary}]`}
                  onClick={() => setOpenMobile(false)}
                >
                  Khóa học của tôi
                </Link>
                <button
                  onClick={() => {
                    setOpenMobile(false);
                    logout();
                  }}
                  className="text-left px-4 py-2 text-[15px] rounded-md hover:bg-slate-50"
                  type="button"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={`px-4 py-2 text-[15px] rounded-md hover:bg-slate-50 hover:text-[${BRAND.primary}]`}
                  onClick={() => setOpenMobile(false)}
                >
                  Đăng nhập
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-[15px] rounded-md text-white text-center"
                  onClick={() => setOpenMobile(false)}
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Đăng ký
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
