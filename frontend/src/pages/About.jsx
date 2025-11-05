// "use client"

// import { useState } from "react"
// import { Menu, X, User } from "lucide-react"

// export default function About() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const navItems = [
//     { label: "Giới thiệu", href: "#" },
//     { label: "Chương trình học", href: "#" },
//     { label: "Đề thi online", href: "#" },
//     { label: "Flashcards", href: "#" },
//     { label: "Blog", href: "#" },
//     { label: "Kích hoạt tài khoản", href: "#" },
//   ]

//   const features = [
//     {
//       title: "Adaptive Learning",
//       description: "Tối ưu lộ trình luyện thi dựa trên khả năng của bạn",
//     },
//     {
//       title: "Spaced Repetition",
//       description: "Ôn tập flashcards một cách khoa học và hiệu quả",
//     },
//     {
//       title: "Mini-game Exercises",
//       description: "Bài tập dạng mini-game giúp học tập thú vị hơn",
//     },
//     {
//       title: "AI Grading",
//       description: "Chấm chữa phát âm và bài thi nói/viết bằng AI",
//     },
//     {
//       title: "Detailed Statistics",
//       description: "Thống kê chi tiết theo ngày và từng dạng câu hỏi",
//     },
//     {
//       title: "Personalized Roadmap",
//       description: "Lộ trình luyện thi cá nhân hóa để chinh phục mục tiêu",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">S</span>
//               </div>
//               <span className="font-bold text-lg text-gray-900">STUDY4</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center gap-8">
//               {navItems.map((item) => (
//                 <a key={item.label} href={item.href} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                   {item.label}
//                 </a>
//               ))}
//             </nav>

//             {/* Right Section */}
//             <div className="flex items-center gap-4">
//               <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-gray-800">
//                 <User size={20} />
//               </button>
//               <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {mobileMenuOpen && (
//             <nav className="md:hidden pb-4 space-y-2">
//               {navItems.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className="block text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </nav>
//           )}
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Về chúng tôi</h1>
//             <p className="text-lg text-gray-600 mb-8">
//               Công ty TNHH Công Nghệ A PLUS, đơn vị chủ quản website study4.com, chuyên phát triển và cung cấp các phần
//               mềm luyện thi IELTS, TOEIC, HSK ... online.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* About Content */}
//       <section className="w-full py-16 sm:py-20 bg-white">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div>
//             <div className="mb-12">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Phần mềm luyện thi chất lượng cao</h2>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Các phần mềm luyện thi IELTS, TOEIC, HSK online chất lượng cao của STUDY4 đều được thiết kế sát format
//                 thi thật, theo chương trình chuẩn CEFR (A1-C2) của đại học Cambridge và Oxford (Anh) với nhiều tính năng
//                 và hệ thống bài tập phong phú đa dạng.
//               </p>
//             </div>

//             <div className="mb-12">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Công nghệ học tập tiên tiến</h2>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Phần mềm luyện thi bao gồm các tính năng chuyên sâu và lộ trình luyện thi cá nhân hóa để chinh phục các
//                 mốc điểm quan trọng. STUDY4 áp dụng những công nghệ tối ưu vào học tập như adaptive learning tối ưu lộ
//                 trình luyện thi, spaced-repetition để ôn tập flashcards, các bài tập mini-game, AI để chấm chữa phát âm
//                 và bài thi nói/viết.
//               </p>
//               <p className="text-gray-600 leading-relaxed">
//                 Toàn bộ quá trình luyện thi của bạn sẽ được thống kê chi tiết theo ngày và theo từng dạng câu hỏi để có
//                 thể dễ dàng theo dõi tiến độ và điều chỉnh lộ trình ôn tập một cách phù hợp.
//               </p>
//             </div>

//             {/* Features Grid */}
//             <div className="mb-12">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Các tính năng chính</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {features.map((feature, index) => (
//                   <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                     <p className="text-gray-600 text-sm">{feature.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Business Information */}
//       <section className="w-full py-16 sm:py-20 bg-gray-50">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Thông tin doanh nghiệp</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Công ty chủ quản</h3>
//                 <div className="space-y-3 text-gray-600">
//                   <p>
//                     <span className="font-medium text-gray-900">Tên công ty:</span> Công ty TNHH Công Nghệ A Plus
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-900">Giấy đăng ký kinh doanh:</span> 0109675459
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-900">Ngày cấp phép:</span> 17/06/2021
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-900">Địa chỉ:</span> Số 15, Ngõ 208 Giải Phóng, Phường Phương
//                     Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Trung tâm đào tạo</h3>
//                 <div className="space-y-3 text-gray-600">
//                   <p>
//                     <span className="font-medium text-gray-900">Tên trung tâm:</span> Trung tâm ngoại ngữ STUDY4
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-900">Giấy chứng nhận:</span> 2654/QĐ-SGDĐT
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-900">Cấp bởi:</span> Sở Giáo dục và Đào tạo Hà Nội
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-900">Địa chỉ:</span> Số 17, Ngõ 208 Giải Phóng, Phường Phương
//                     Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ với chúng tôi</h3>
//               <div className="space-y-3 text-gray-600">
//                 <p>
//                   <span className="font-medium text-gray-900">Hotline:</span> 096 369 5525
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-900">Email:</span> study4.team@gmail.com
//                 </p>
//                 <p className="text-sm text-gray-500 mt-4">
//                   Xin vui lòng liên hệ với chúng tôi nếu bạn có bất cứ thắc mắc hay góp ý nào.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full bg-gray-900 text-gray-300 py-12 sm:py-16">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             {/* About */}
//             <div>
//               <h4 className="text-white font-semibold mb-4">Về STUDY4</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Resources */}
//             <div>
//               <h4 className="text-white font-semibold mb-4">Tài nguyên</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Policies */}
//             <div>
//               <h4 className="text-white font-semibold mb-4">Chính sách chung</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Điều khoản sử dụng
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* More Policies */}
//             <div>
//               <h4 className="text-white font-semibold mb-4">Khác</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Chính sách kiểm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Chính sách giao, nhận hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-700 pt-8 mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <h4 className="text-white font-semibold mb-4">CÔNG TY TNHH CÔNG NGHỆ A PLUS</h4>
//                 <ul className="space-y-2 text-sm">
//                   <li>
//                     <span className="text-gray-400">Hotline:</span> 096 369 5525
//                   </li>
//                   <li>
//                     <span className="text-gray-400">Email:</span> study4.team@gmail.com
//                   </li>
//                   <li>
//                     <span className="text-gray-400">Địa chỉ:</span> Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận
//                     Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                   </li>
//                   <li>
//                     <span className="text-gray-400">ĐKKD:</span> 0109675459
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="text-white font-semibold mb-4">TRUNG TÂM NGOẠI NGỮ STUDY4</h4>
//                 <p className="text-sm text-gray-400">
//                   Số 17, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//                 <p className="text-sm text-gray-400 mt-2">Quyết định cho phép hoạt động số 2654/QĐ-SGDĐT</p>
//               </div>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
//             <p className="mb-4">STUDY4.COM © Bản quyền của Công ty TNHH Công Nghệ A Plus.</p>
//             <p className="text-xs leading-relaxed">
//               IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//               Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//               Cambridge ESOL, the British Council, and IDP Education Australia.
//             </p>
//             <p className="text-xs leading-relaxed mt-2">
//               ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//               not endorsed or approved by ETS.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



// src/pages/About.jsx
"use client";

import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle } from "lucide-react";

/* ---------- helpers: full-width section ---------- */
const Section = ({ id, title, subtitle, action, children, className = "" }) => (
  <section id={id} className={`w-screen overflow-x-hidden py-12 lg:py-16 ${className}`}>
    <div className="w-screen px-6 lg:px-12">
      {(title || subtitle || action) && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {title && <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{title}</h2>}
            {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  </section>
);

const Primary = ({ className = "", ...props }) => (
  <button
    className={
      "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
      className
    }
    {...props}
  />
);

/* ---------- dữ liệu tĩnh ---------- */
const FEATURES = [
  { title: "Adaptive Learning", desc: "Tối ưu lộ trình luyện thi dựa trên năng lực hiện tại." },
  { title: "Spaced Repetition", desc: "Ôn tập flashcards khoa học để nhớ lâu hơn." },
  { title: "Mini-game Exercises", desc: "Bài tập dạng mini-game giúp học thú vị và bền bỉ." },
  { title: "AI Grading", desc: "Chấm/chữa phát âm & bài thi nói/viết bằng AI." },
  { title: "Detailed Statistics", desc: "Thống kê chi tiết theo ngày & theo dạng câu hỏi." },
  { title: "Personalized Roadmap", desc: "Lộ trình cá nhân hoá để chinh phục mục tiêu điểm." },
];

export default function About() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="w-screen overflow-x-hidden bg-gradient-to-b from-blue-50 to-white pt-10 lg:pt-14 pb-12">
        <div className="w-screen px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">STUDY4 • Về chúng tôi</div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Về chúng tôi
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Công ty TNHH Công Nghệ A PLUS — đơn vị chủ quản website <span className="font-medium">study4.com</span> —
              chuyên phát triển & cung cấp phần mềm luyện thi <b>IELTS, TOEIC, HSK</b> online chất lượng cao.
            </p>
            <div className="mt-6 flex gap-3">
              <Primary>Khám phá chương trình học</Primary>
              <a href="#contact" className="rounded-full border px-5 py-3 text-slate-700 hover:bg-slate-50 transition">
                Liên hệ nhanh
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu & Công nghệ học tập */}
      <Section
        id="intro"
        title="Phần mềm luyện thi chất lượng cao"
        subtitle="Thiết kế sát format thi thật, bám chuẩn CEFR (A1–C2) của Cambridge & Oxford."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-lg text-slate-900">Mục tiêu & phạm vi</h3>
            <p className="mt-2 text-slate-700">
              Các phần mềm của STUDY4 được xây dựng theo lộ trình từ cơ bản đến nâng cao, có ngân hàng bài tập đa dạng
              và giao diện thân thiện cho người học Việt.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              {[
                "Sát đề & cập nhật thường xuyên.",
                "Luyện đủ 4 kỹ năng và dạng câu hỏi trọng tâm.",
                "Bài tập tăng dần độ khó kèm gợi ý/giải thích."
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#2563eb]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-lg text-slate-900">Công nghệ học tập tiên tiến</h3>
            <p className="mt-2 text-slate-700">
              STUDY4 áp dụng <b>adaptive learning</b>, <b>spaced-repetition</b>, bài tập dạng mini-game và <b>AI Grading</b>
              cho phát âm, nói/viết. Toàn bộ quá trình học được thống kê chi tiết theo ngày và theo từng dạng câu hỏi
              để người học theo dõi tiến độ và điều chỉnh phù hợp.
            </p>
          </div>
        </div>
      </Section>

      {/* Tính năng chính */}
      <Section id="features" title="Các tính năng chính">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 border rounded-2xl bg-white hover:shadow-md transition"
            >
              <div className="h-10 w-10 grid place-items-center rounded-full bg-[#2563eb]/10 text-[#2563eb] mb-3">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">{f.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sứ mệnh & Giá trị */}
      <Section id="mission" title="Sứ mệnh & giá trị">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6">
            <h4 className="font-semibold text-slate-900">Lấy người học làm trung tâm</h4>
            <p className="mt-2 text-slate-700">Tối ưu trải nghiệm học tập, giảm ma sát, tăng động lực.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h4 className="font-semibold text-slate-900">Đo lường & cải tiến liên tục</h4>
            <p className="mt-2 text-slate-700">Ra quyết định dựa trên dữ liệu & phản hồi thực tế.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h4 className="font-semibold text-slate-900">Công nghệ vì hiệu quả</h4>
            <p className="mt-2 text-slate-700">AI/automation để học nhanh, nhớ lâu, đạt mục tiêu.</p>
          </div>
        </div>
      </Section>

      {/* Thông tin pháp lý/đơn vị */}
      <Section id="business" title="Thông tin doanh nghiệp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Công ty chủ quản</h3>
            <div className="space-y-3 text-slate-700">
              <p><span className="font-medium text-slate-900">Tên công ty:</span> Công ty TNHH Công Nghệ A Plus</p>
              <p><span className="font-medium text-slate-900">Giấy ĐKKD:</span> 0109675459</p>
              <p><span className="font-medium text-slate-900">Ngày cấp phép:</span> 17/06/2021</p>
              <p>
                <span className="font-medium text-slate-900">Địa chỉ:</span> Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt,
                Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Trung tâm đào tạo</h3>
            <div className="space-y-3 text-slate-700">
              <p><span className="font-medium text-slate-900">Tên trung tâm:</span> Trung tâm ngoại ngữ STUDY4</p>
              <p><span className="font-medium text-slate-900">Giấy chứng nhận:</span> 2654/QĐ-SGDĐT</p>
              <p><span className="font-medium text-slate-900">Cấp bởi:</span> Sở Giáo dục & Đào tạo Hà Nội</p>
              <p>
                <span className="font-medium text-slate-900">Địa chỉ:</span> Số 17, Ngõ 208 Giải Phóng, Phường Phương Liệt,
                Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
              </p>
            </div>
          </div>
        </div>

        {/* Liên hệ */}
        <div id="contact" className="bg-white p-6 rounded-2xl border">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Liên hệ với chúng tôi</h3>
          <div className="space-y-2 text-slate-700">
            <p><span className="font-medium text-slate-900">Hotline:</span> 096 369 5525</p>
            <p><span className="font-medium text-slate-900">Email:</span> study4.team@gmail.com</p>
            <p className="text-sm text-slate-500 mt-3">Vui lòng liên hệ khi bạn cần hỗ trợ hoặc góp ý.</p>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
