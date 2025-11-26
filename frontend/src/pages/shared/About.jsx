



// src/pages/About.jsx
"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
