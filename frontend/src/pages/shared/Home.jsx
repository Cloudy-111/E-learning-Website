// "use client";

// import { useState } from "react";
// import { ChevronLeft, ChevronRight, Clock, Users, Tag } from "lucide-react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";


// // Study4Homepage

// export default function Study4Homepage() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     region: "",
//     subject: "",
//   });

//   const courses = [
//     {
//       id: 1,
//       title: "[Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation",
//       subtitle: "[Tặng khoá TED Talks]",
//       students: "16,335",
//       reviews: 211,
//       price: 699000,
//       originalPrice: 899000,
//       discount: -22,
//       category: "#Phần mềm online",
//     },
//     {
//       id: 2,
//       title: "[IELTS Fundamentals] Từ vựng và ngữ pháp cơ bản IELTS",
//       students: "36,603",
//       reviews: 260,
//       price: 989000,
//       originalPrice: 1800000,
//       discount: -45,
//       category: "#Phần mềm online",
//     },
//     {
//       id: 3,
//       title:
//         "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
//       students: "30,506",
//       reviews: 222,
//       price: 699000,
//       originalPrice: 899000,
//       discount: -22,
//       category: "#Phần mềm online",
//     },
//   ];

//   const latestTests = [
//     { id: 1, title: "IELTS Simulation Listening test 1", duration: "40 phút", views: 1269753, attempts: 3379, parts: 4, questions: 40 },
//     { id: 2, title: "IELTS Simulation Listening test 10", duration: "40 phút", views: 426969, attempts: 1045, parts: 4, questions: 40 },
//     { id: 3, title: "IELTS Simulation Listening test 2", duration: "40 phút", views: 528429, attempts: 972, parts: 4, questions: 40 },
//     { id: 4, title: "IELTS Simulation Listening test 3", duration: "40 phút", views: 346089, attempts: 559, parts: 4, questions: 40 },
//     { id: 5, title: "IELTS Simulation Listening test 4", duration: "40 phút", views: 269931, attempts: 495, parts: 4, questions: 40 },
//     { id: 6, title: "IELTS Simulation Listening test 5", duration: "40 phút", views: 238410, attempts: 376, parts: 4, questions: 40 },
//     { id: 7, title: "IELTS Simulation Listening test 6", duration: "40 phút", views: 213135, attempts: 388, parts: 4, questions: 40 },
//     { id: 8, title: "IELTS Simulation Listening test 7", duration: "40 phút", views: 153807, attempts: 279, parts: 4, questions: 40 },
//   ];

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % courses.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);

//   return (
//     <div className="w-full bg-white">
//       {/* Header tái sử dụng */}
//       <Header
//         brand={{ name: "Elearning", abbr: "P" }}
//         // Nếu dùng react-router, bạn có thể truyền currentPath = location.pathname
//         currentPath="/"
//         onLoginClick={() => console.log("Login clicked")}
//       />

//       {/* Hero Carousel */}
//       <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-12">
//         <div className="w-full px-6">
//           <div className="relative flex items-center justify-center gap-4">
//             <button onClick={prevSlide} className="p-2 hover:bg-white rounded-full transition" type="button">
//               <ChevronLeft className="w-6 h-6 text-gray-600" />
//             </button>

//             <div className="flex-1 max-w-4xl">
//               <div className="bg-white rounded-lg p-8 shadow-sm">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">{courses[currentSlide].title}</h2>
//                 {courses[currentSlide].subtitle && (
//                   <p className="text-blue-600 mb-4">{courses[currentSlide].subtitle}</p>
//                 )}
//                 <div className="flex items-center gap-6 mb-4">
//                   <span className="text-sm text-gray-600">👥 {courses[currentSlide].students} Học viên</span>
//                   <span className="text-sm text-gray-600">⭐ ({courses[currentSlide].reviews})</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className="text-2xl font-bold text-gray-900">
//                     {courses[currentSlide].price.toLocaleString()}đ
//                   </span>
//                   <span className="text-lg text-gray-400 line-through">
//                     {courses[currentSlide].originalPrice.toLocaleString()}đ
//                   </span>
//                   <span className="text-red-600 font-bold">{courses[currentSlide].discount}%</span>
//                 </div>
//               </div>
//             </div>

//             <button onClick={nextSlide} className="p-2 hover:bg-white rounded-full transition" type="button">
//               <ChevronRight className="w-6 h-6 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Featured Courses */}
//       <section className="w-full bg-white py-12 border-b border-gray-200">
//         <div className="w-full px-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Khóa học online nổi bật</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div
//                 key={course.id}
//                 className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
//               >
//                 <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
//                 <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
//                   <span>👥 {course.students} Học viên</span>
//                   <span>⭐ ({course.reviews})</span>
//                 </div>
//                 <div className="mb-4">
//                   <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
//                     {course.category}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-xl font-bold text-gray-900">{course.price.toLocaleString()}đ</span>
//                   <span className="text-sm text-gray-400 line-through">{course.originalPrice.toLocaleString()}đ</span>
//                   <span className="text-red-600 font-bold text-sm">{course.discount}%</span>
//                 </div>
//                 <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition">
//                   Xem chi tiết
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="w-full bg-gray-50 py-12 border-b border-gray-200">
//         <div className="w-full px-6">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Về P Elearning</h2>
//             <p className="text-gray-700 mb-4 leading-relaxed">
//               Các khóa học lập trình trực tuyến chất lượng cao của P Elearning được thiết kế sát với thực
//               tiễn công nghiệp, theo chương trình tiêu chuẩn từ cơ bản đến chuyên sâu với nhiều tính năng hiện đại
//               và hệ thống bài thực hành (Code Lab, Dự án thực tế, Thử thách thuật toán) phong phú đa dạng.
//             </p>
//             <p className="text-gray-700 leading-relaxed">
//               Nền tảng học lập trình của chúng tôi bao gồm các tính năng chuyên sâu và lộ trình học tập cá nhân hóa
//               để giúp bạn chinh phục các kỹ năng và công nghệ quan trọng trong ngành. P Elearning áp dụng những công
//               nghệ tối ưu vào học tập như môi trường Code Editor tích hợp để thực hành trực tiếp, hệ thống chấm bài
//               tự động AI kiểm tra độ chính xác và hiệu suất code của bạn, cùng các dự án mô phỏng thực tế.
//               Toàn bộ quá trình học tập của bạn sẽ được thống kê chi tiết theo ngày và theo từng module/ngôn ngữ
//               để bạn có thể dễ dàng theo dõi tiến độ và điều chỉnh lộ trình học tập một cách phù hợp nhất.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section className="w-full bg-[#e8f1ff] py-20">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className="text-gray-800 space-y-6">
//             <h2 className="text-3xl font-extrabold text-[#0052CC] leading-tight">
//               Các Khóa Học Lập Trình & Công Nghệ Trực Tuyến Chất Lượng Cao
//             </h2>
//             <p>
//               Chúng tôi cung cấp các khóa học chuyên sâu giúp bạn phát triển kỹ năng lập trình một cách hiệu quả.
//               Các bài luyện tập đa dạng từ cơ bản đến nâng cao với giao diện thân thiện, dễ sử dụng và phù hợp với
//               mọi cấp độ, từ người mới bắt đầu đến lập trình viên muốn nâng cao.
//             </p>
//             <p>
//               Lộ trình học được thiết kế bám sát nhu cầu thị trường và được tối ưu để giúp bạn thành thạo
//               công nghệ và tạo ra sản phẩm thực tế nhanh chóng.
//             </p>
//             <p className="font-medium text-[#0052CC]">
//               Hỗ trợ học thử miễn phí – đánh giá năng lực hiện tại và tư vấn lộ trình học lập trình phù hợp
//               (ví dụ: Lập trình Web, Phát triển Ứng dụng Di động, Khoa học Dữ liệu)!
//             </p>
//           </div>

//           {/* Form Card + Chat Button */}
//           <div className="relative flex justify-center lg:justify-end">
//             {/* Chat Icon */}
//             <button
//               className="absolute -top-4 -right-4 bg-[#0052CC] w-14 h-14 rounded-full shadow-xl
//               flex items-center justify-center text-white text-lg hover:bg-blue-900 transition"
//               aria-label="Chat AI"
//               type="button"
//             >
//               💬
//             </button>

//             {/* Form */}
//             <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 w-full max-w-sm">
//               <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Tư vấn lộ trình học</h3>

//               <form onSubmit={handleFormSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Họ và tên*"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Số điện thoại*"
//                   value={formData.phone}
//                   onChange={handleFormChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
//                 />

//                 <input
//                   type="text"
//                   name="region"
//                   placeholder="Khu vực học (Thành phố/Tỉnh)*"
//                   value={formData.region}
//                   onChange={handleFormChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
//                 />

//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
//                 >
//                   <option value="">Môn học bạn quan tâm</option>
//                   <option value="IELTS">IELTS</option>
//                   <option value="TOEIC">TOEIC</option>
//                   <option value="HSK">HSK</option>
//                 </select>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#0052CC] text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition"
//                 >
//                   Đăng ký tư vấn miễn phí
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Latest Tests */}
//       <section className="w-full bg-gray-50 py-12 border-b border-gray-200">
//         <div className="w-full px-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Đề thi mới nhất</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {latestTests.map((test) => (
//               <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
//                 <h3 className="font-bold text-gray-900 mb-3 text-sm line-clamp-2">{test.title}</h3>
//                 <div className="space-y-2 mb-4 text-xs text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <Clock className="w-4 h-4" />
//                     <span>{test.duration}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users className="w-4 h-4" />
//                     <span>{`${test.views.toLocaleString()} | ${test.attempts}`}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Tag className="w-4 h-4" />
//                     <span>{`${test.parts} phần thi | ${test.questions} câu hỏi`}</span>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 mb-3">
//                   <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">#IELTS Academic</span>
//                   <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">#Listening</span>
//                 </div>
//                 <button className="w-full border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">
//                   Chi tiết
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Community Section */}
//       <section className="w-full bg-white py-12 border-b border-gray-200">
//         <div className="w-full px-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Cộng đồng Học tập P Elearning</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <h3 className="text-lg font-bold text-gray-900">
//                 Thành thạo Lập trình, Công nghệ, Thuật toán... không giới hạn
//               </h3>
//               <p className="text-gray-700">
//                 và hơn 1 triệu lập trình viên đang hoạt động mỗi tháng
//                 (nếu con số này là thật, nếu không, bạn có thể thay bằng con số thực tế hoặc viết:
//                 "và cộng đồng lập trình viên lớn mạnh")
//               </p>
//               <ul className="space-y-3 text-gray-700">
//                 {[
//                   "Cộng đồng lập trình sôi nổi với hơn 1 triệu thành viên hoạt động mỗi tháng (Điều chỉnh con số nếu cần thiết).",
//                   "Đặt câu hỏi code cho đội ngũ hỗ trợ kỹ thuật và các lập trình viên khác để nhận giải đáp và gợi ý chỉ sau 30 phút.",
//                   "Chia sẻ kinh nghiệm học tập, debug code và cùng làm dự án với các thành viên khác.",
//                   "Thực hành kỹ năng phỏng vấn (Mock Interview) & Review Code (Đánh giá code) và nhận được nhận xét, chấm điểm từ bạn học và chuyên gia.",
//                 ].map((line) => (
//                   <li key={line} className="flex gap-3">
//                     <span className="text-blue-600">✓</span>
//                     <span>{line}</span>
//                   </li>
//                 ))}
//               </ul>
//               <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
//                 Bắt đầu học code
//               </button>
//             </div>
//             <div className="bg-blue-50 rounded-lg p-8 flex items-center justify-center">
//               <div className="text-center">
//                 <div className="text-5xl font-bold text-blue-600 mb-2">1M+</div>
//                 <p className="text-gray-700">Học viên hoạt động mỗi tháng</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }
















// src/pages/Homepage.jsx
// "use client";

// import { Link, useNavigate } from "react-router-dom";
// import { useMemo } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   BookOpen, GraduationCap, Library, Timer, ArrowRight, CheckCircle2, Trophy
// } from "lucide-react";

// const PRIMARY = "#2c65e6";
// const PRIMARY_HOVER = "#2153c3";

// export default function Homepage() {
//   const navigate = useNavigate();

//   // Mock data — có thể nối API sau
//   const categories = useMemo(
//     () => [
//       { icon: <BookOpen className="w-5 h-5" />, label: "Khóa học", to: "/courses", desc: "Lộ trình chi tiết" },
//       { icon: <Library className="w-5 h-5" />, label: "Thư viện đề thi", to: "/exam", desc: "Luyện đề có đáp án" },
//       { icon: <Timer className="w-5 h-5" />, label: "Dashboard", to: "/s/dashboard", desc: "Theo dõi tiến độ" },
//       { icon: <GraduationCap className="w-5 h-5" />, label: "Gói thành viên", to: "/membership", desc: "Học trọn bộ" },
//     ],
//     []
//   );

//   const featuredCourses = useMemo(
//     () => [
//       {
//         id: "IELTS-6-5",
//         title: "IELTS Foundation đến 6.5+",
//         desc: "Grammar, Vocabulary, 4 kỹ năng & chiến lược làm bài.",
//         lessons: 72,
//         thumb: "/images/course-ielts.jpg",
//       },
//       {
//         id: "TOEIC-750",
//         title: "TOEIC 750+ Intensive",
//         desc: "RC/LC, mẹo bẫy câu & đề mô phỏng format mới.",
//         lessons: 56,
//         thumb: "/images/course-toeic.jpg",
//       },
//       {
//         id: "SPEAK-UP",
//         title: "Speaking Mastery",
//         desc: "Phát âm – Fluency – Coherence với feedback mẫu.",
//         lessons: 40,
//         thumb: "/images/course-speaking.jpg",
//       },
//     ],
//     []
//   );

//   const examsShowcase = useMemo(
//     () => [
//       { id: "mock-ielts-01", title: "IELTS Mock Test 01", duration: 90, opened: true },
//       { id: "toeic-mini-07", title: "TOEIC Mini Test 07", duration: 45, opened: true },
//       { id: "vocab-quiz-a2", title: "Vocabulary Quiz A2", duration: 15, opened: false },
//     ],
//     []
//   );

//   return (
//     <div className="min-h-screen bg-[#f8f9fa]">
//       <Header />

//       {/* HERO */}
//       <section className="w-full bg-white border-b">
//         <div className="w-full px-6 lg:px-12 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//           {/* Left copy */}
//           <div>
//             <p className="text-xs uppercase tracking-wider text-[#35509a] font-semibold mb-2">
//               PTIT E-Learning
//             </p>
//             <h1 className="text-[28px] leading-[1.2] lg:text-[40px] font-extrabold text-[#1a1a1a]">
//               Học thông minh – Luyện đề hiệu quả – Theo dõi tiến độ rõ ràng
//             </h1>
//             <p className="mt-4 text-[#677788]">
//               Khoá học cô đọng, hệ thống bài tập & đề thi chuẩn hoá,
//               đáp án chi tiết và phân tích kết quả theo kỹ năng.
//             </p>

//             <div className="mt-6 flex flex-wrap gap-3">
//               <Link
//                 to="/courses"
//                 className="inline-flex items-center gap-2 rounded-lg text-white px-5 py-3 font-semibold transition"
//                 style={{ backgroundColor: PRIMARY }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//               >
//                 Bắt đầu học <ArrowRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 to="/exam"
//                 className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold border"
//                 style={{ borderColor: "#e0e0e0", color: "#1a1a1a" }}
//               >
//                 Luyện đề ngay
//               </Link>
//             </div>

//             <div className="mt-6 flex items-center gap-6 text-sm text-[#677788]">
//               <span className="inline-flex items-center gap-1">
//                 <CheckCircle2 className="w-4 h-4 text-green-600" /> Học mọi lúc
//               </span>
//               <span className="inline-flex items-center gap-1">
//                 <CheckCircle2 className="w-4 h-4 text-green-600" /> Đề sát format
//               </span>
//               <span className="inline-flex items-center gap-1">
//                 <CheckCircle2 className="w-4 h-4 text-green-600" /> Theo dõi tiến độ
//               </span>
//             </div>
//           </div>

//           {/* Right visual */}
//           <div className="rounded-2xl overflow-hidden border lg:ml-auto">
//             <img
//               src="/hero-ielts.jpg"
//               alt="Elearning Hero"
//               className="w-full h-[260px] lg:h-[360px] object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* QUICK NAV / CATEGORIES */}
//       <section className="w-full px-6 lg:px-12 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {categories.map((c) => (
//             <Link
//               key={c.to}
//               to={c.to}
//               className="bg-white border rounded-xl p-4 hover:shadow-sm transition flex items-center gap-3"
//               style={{ borderColor: "#e0e0e0" }}
//             >
//               <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">
//                 {c.icon}
//               </div>
//               <div>
//                 <p className="font-semibold text-[#1a1a1a]">{c.label}</p>
//                 <p className="text-xs text-[#677788]">{c.desc}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* FEATURED COURSES */}
//       <section className="w-full px-6 lg:px-12 pb-2">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">
//             Khóa học nổi bật
//           </h2>
//           <Link to="/courses" className="text-sm font-semibold" style={{ color: PRIMARY }}>
//             Xem tất cả
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {featuredCourses.map((c) => (
//             <article
//               key={c.id}
//               className="bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition flex flex-col"
//               style={{ borderColor: "#e0e0e0" }}
//             >
//               <img
//                 src={c.thumb || "/images/course-placeholder.jpg"}
//                 alt={c.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4 flex-1 flex flex-col">
//                 <h3 className="font-semibold text-[#1a1a1a] line-clamp-2">{c.title}</h3>
//                 <p className="text-sm text-[#677788] mt-2 line-clamp-3">{c.desc}</p>
//                 <div className="mt-3 text-xs text-[#677788]">Số bài học: <b>{c.lessons}</b></div>
//                 <button
//                   onClick={() => navigate(`/courses/${c.id}`)}
//                   className="mt-auto w-full rounded-lg text-white py-2 font-medium transition"
//                   style={{ backgroundColor: PRIMARY }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                   type="button"
//                 >
//                   Xem chi tiết
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* EXAM SHOWCASE */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h3 className="text-lg lg:text-xl font-extrabold text-[#1a1a1a]">
//                 Thư viện đề thi – Luyện là lên!
//               </h3>
//               <p className="text-sm text-[#677788] mt-1">
//                 Đề chuẩn hoá, chấm tự động, xem đáp án chi tiết.
//               </p>
//             </div>
//             <Link
//               to="/exam"
//               className="inline-flex items-center gap-2 rounded-lg text-white px-4 py-2 font-semibold transition"
//               style={{ backgroundColor: PRIMARY }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//             >
//               Vào thư viện đề
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
//             {examsShowcase.map((ex) => (
//               <div key={ex.id} className="bg-white border rounded-xl p-4" style={{ borderColor: "#e0e0e0" }}>
//                 <p className="font-semibold text-[#1a1a1a] line-clamp-2">{ex.title}</p>
//                 <div className="mt-2 text-xs text-[#677788]">
//                   ⏱️ {ex.duration} phút • {ex.opened ? "Đang mở" : "Đã khóa"}
//                 </div>
//                 <button
//                   onClick={() => navigate(`/exam/${ex.id}`)}
//                   className="mt-3 w-full rounded-lg text-white py-2 text-sm font-medium transition"
//                   style={{ backgroundColor: PRIMARY }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                   type="button"
//                 >
//                   Chi tiết
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="w-full px-6 lg:px-12 py-6">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: "Học viên", value: "12,500+" },
//             { label: "Bài học", value: "1,200+" },
//             { label: "Đề thi/Quiz", value: "350+" },
//             { label: "Tỉ lệ hài lòng", value: "97%" },
//           ].map((s, i) => (
//             <div key={i} className="bg-white border rounded-xl p-5 text-center" style={{ borderColor: "#e0e0e0" }}>
//               <p className="text-2xl font-extrabold text-[#1a1a1a]">{s.value}</p>
//               <p className="text-xs text-[#677788] mt-1">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TESTIMONIAL */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
//           <div className="bg-white border rounded-2xl p-6" style={{ borderColor: "#e0e0e0" }}>
//             <div className="flex items-center gap-2 mb-2">
//               <Trophy className="w-5 h-5 text-[#1b3ea9]" />
//               <h4 className="font-semibold text-[#1a1a1a]">Học viên nói gì?</h4>
//             </div>
//             <p className="text-[#677788]">
//               “Nhờ lộ trình gợi ý + phần luyện đề có giải chi tiết, mình tăng từ 550 TOEIC lên 785 sau 2 tháng.
//               Dashboard theo dõi tiến độ cực rõ ràng!” — <b>Anh Khoa</b>
//             </p>
//           </div>

//           <div className="bg-white border rounded-2xl overflow-hidden" style={{ borderColor: "#e0e0e0" }}>
//             <img
//               src="/images/study-banner.jpg"
//               alt="Study Banner"
//               className="w-full h-40 object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="w-full px-6 lg:px-12 pb-12">
//         <div className="bg-white border rounded-2xl p-6 lg:p-8 text-center" style={{ borderColor: "#e0e0e0" }}>
//           <h3 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">
//             Sẵn sàng bắt đầu hành trình mới?
//           </h3>
//           <p className="text-[#677788] mt-2">
//             Chọn khoá học phù hợp, luyện đề đều đặn và theo dõi tiến bộ mỗi ngày.
//           </p>
//           <div className="mt-5 flex items-center justify-center gap-3">
//             <Link
//               to="/courses"
//               className="inline-flex items-center gap-2 rounded-lg text-white px-5 py-3 font-semibold transition"
//               style={{ backgroundColor: PRIMARY }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//             >
//               Khám phá khoá học
//             </Link>
//             <Link
//               to="/exam"
//               className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold border"
//               style={{ borderColor: "#e0e0e0", color: "#1a1a1a" }}
//             >
//               Tới thư viện đề
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }













// src/pages/Homepage.jsx
// "use client";

// import { useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   ArrowRight, BadgeCheck, BookOpen, Brain, CalendarDays, ChartLine,
//   CheckCircle2, ChevronDown, Clock, GraduationCap, Library, PlayCircle,
//   Rocket, Shield, Stars, Timer, Trophy, Users, Wand2
// } from "lucide-react";

// const PRIMARY = "#2c65e6";
// const PRIMARY_HOVER = "#2153c3";
// const BORDER = "#e0e0e0";

// export default function Homepage() {
//   const navigate = useNavigate();

//   // ==== Mock data (có thể nối API sau) ====
//   const categories = useMemo(() => ([
//     { icon: <BookOpen className="w-5 h-5" />, label: "Khóa học", to: "/courses", desc: "Lộ trình rõ ràng" },
//     { icon: <Library className="w-5 h-5" />, label: "Thư viện đề thi", to: "/exam", desc: "Đáp án chi tiết" },
//     { icon: <Timer className="w-5 h-5" />, label: "Luyện tập nhanh", to: "/s/quick-practice", desc: "Quiz 5-10 phút" },
//     { icon: <GraduationCap className="w-5 h-5" />, label: "Gói thành viên", to: "/membership", desc: "Tiết kiệm 60%" },
//   ]), []);

//   const learningTracks = useMemo(() => ([
//     {
//       id: "ielts-track",
//       title: "IELTS từ 0 → 6.5+",
//       bullets: ["Ngữ pháp & từ vựng cốt lõi", "4 kỹ năng theo band", "Mock test có giải"],
//       to: "/tracks/ielts",
//       cover: "/images/track-ielts.jpg",
//     },
//     {
//       id: "toeic-track",
//       title: "TOEIC 500 → 800+",
//       bullets: ["LC/RC bám sát format", "Chiến lược chống bẫy", "Đề mô phỏng mới"],
//       to: "/tracks/toeic",
//       cover: "/images/track-toeic.jpg",
//     },
//     {
//       id: "speaking-track",
//       title: "Speaking Mastery",
//       bullets: ["Phát âm & intonation", "Fluency/Coherence", "Mẫu câu & topic bank"],
//       to: "/tracks/speaking",
//       cover: "/images/track-speaking.jpg",
//     },
//   ]), []);

//   const featuredCourses = useMemo(() => ([
//     { id: "IELTS-6-5", title: "IELTS Foundation đến 6.5+", lessons: 72, level: "Beginner–Intermediate", thumb: "/images/course-ielts.jpg" },
//     { id: "TOEIC-750", title: "TOEIC 750+ Intensive", lessons: 56, level: "Intermediate", thumb: "/images/course-toeic.jpg" },
//     { id: "GRAMMAR-FAST", title: "Grammar Fast Track", lessons: 30, level: "Beginner", thumb: "/images/course-grammar.jpg" },
//     { id: "VOCAB-BOOST", title: "Academic Vocabulary Boost", lessons: 24, level: "All levels", thumb: "/images/course-vocab.jpg" },
//   ]), []);

//   const examsShowcase = useMemo(() => ([
//     { id: "mock-ielts-01", title: "IELTS Mock Test 01", duration: 90, opened: true },
//     { id: "toeic-mini-07", title: "TOEIC Mini Test 07", duration: 45, opened: true },
//     { id: "vocab-quiz-a2", title: "Vocabulary Quiz A2", duration: 15, opened: false },
//   ]), []);

//   const blogPosts = useMemo(() => ([
//     { id: "b1", title: "Cách tăng band Reading nhanh & bền vững", tag: "IELTS", cover: "/images/blog-reading.jpg" },
//     { id: "b2", title: "Template Speaking Part 2 dễ tùy biến", tag: "Speaking", cover: "/images/blog-speaking.jpg" },
//     { id: "b3", title: "Bí kíp tránh bẫy Part 5-6 TOEIC", tag: "TOEIC", cover: "/images/blog-toeic.jpg" },
//   ]), []);

//   const faqsDefault = [
//     { q: "Học trên nền tảng này cần chuẩn bị gì?", a: "Chỉ cần máy tính/điện thoại có internet. Bạn có thể học mọi lúc – mọi nơi, nền tảng hỗ trợ đồng bộ tiến độ." },
//     { q: "Khoá học có thời hạn không?", a: "Tuỳ gói thành viên và khoá học. Với gói thành viên, bạn có thể truy cập toàn bộ thư viện trong thời hạn gói." },
//     { q: "Đề thi có đáp án & giải chi tiết?", a: "Có. Sau khi nộp bài, bạn xem lại đáp án đúng/sai, giải thích và thống kê để ôn lại." },
//     { q: "Tôi có thể học theo lộ trình gợi ý?", a: "Có. Mỗi mục tiêu có lộ trình gồm bài học + luyện tập + đề mô phỏng. Bạn theo dõi tiến độ ở Dashboard." },
//   ];

//   const [faqs, setFaqs] = useState(() => faqsDefault.map((f, i) => ({ ...f, open: i === 0 })));

//   return (
//     <div className="min-h-screen bg-[#f8f9fa]">
//       <Header />

//       {/* ===== HERO ===== */}
//       <section className="relative w-full overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
//         <div className="relative w-full px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
//           <div>
//             <p className="text-xs uppercase tracking-wider text-[#35509a] font-semibold mb-2">
//               PTIT E-Learning
//             </p>
//             <h1 className="text-[30px] leading-[1.2] lg:text-[44px] font-extrabold text-[#1a1a1a]">
//               Học thông minh – Luyện đề hiệu quả – Theo dõi tiến độ rõ ràng
//             </h1>
//             <p className="mt-4 text-[#677788] max-w-2xl">
//               Lộ trình rõ ràng, video cô đọng, bài tập tương tác, đề mô phỏng sát format.
//               Kèm thống kê cá nhân giúp bạn học trúng điểm yếu.
//             </p>

//             {/* Search */}
//             <div className="mt-6 flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Tìm khóa học, đề thi, chủ đề…"
//                 className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none"
//                 style={{ borderColor: BORDER }}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") navigate(`/courses?q=${encodeURIComponent(e.currentTarget.value)}`);
//                 }}
//               />
//               <button
//                 className="rounded-lg text-white px-5 py-3 font-semibold transition"
//                 style={{ backgroundColor: PRIMARY }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                 onClick={() => navigate("/courses")}
//               >
//                 Tìm kiếm
//               </button>
//             </div>

//             {/* Stats badges */}
//             <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#677788]">
//               <span className="inline-flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-green-600" /> Nội dung cập nhật hàng tuần</span>
//               <span className="inline-flex items-center gap-1"><Shield className="w-4 h-4 text-green-600" /> Hệ thống ổn định</span>
//               <span className="inline-flex items-center gap-1"><Stars className="w-4 h-4 text-yellow-600" /> 97% học viên hài lòng</span>
//             </div>
//           </div>

//           {/* Visual */}
//           <div className="rounded-2xl overflow-hidden border shadow-sm">
//             <img src="/hero-ielts.jpg" alt="Elearning Hero" className="w-full h-[280px] lg:h-[360px] object-cover" />
//           </div>
//         </div>
//       </section>

//       {/* ===== CATEGORIES ===== */}
//       <section className="w-full px-6 lg:px-12 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {categories.map((c) => (
//             <Link key={c.to} to={c.to}
//               className="bg-white border rounded-xl p-4 hover:shadow-sm transition flex items-center gap-3"
//               style={{ borderColor: BORDER }}>
//               <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">{c.icon}</div>
//               <div>
//                 <p className="font-semibold text-[#1a1a1a]">{c.label}</p>
//                 <p className="text-xs text-[#677788]">{c.desc}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* ===== TRACKS ===== */}
//       <section className="w-full px-6 lg:px-12 pb-2">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Lộ trình học theo mục tiêu</h2>
//           <Link to="/tracks" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {learningTracks.map((t) => (
//             <article key={t.id} className="bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition flex flex-col"
//               style={{ borderColor: BORDER }}>
//               <img src={t.cover || "/images/track-placeholder.jpg"} alt={t.title} className="w-full h-40 object-cover" />
//               <div className="p-4 flex-1 flex flex-col">
//                 <h3 className="font-semibold text-[#1a1a1a]">{t.title}</h3>
//                 <ul className="mt-3 text-sm text-[#677788] space-y-1">
//                   {t.bullets.map((b, i) => <li key={i} className="flex gap-2"><span>•</span><span>{b}</span></li>)}
//                 </ul>
//                 <button
//                   onClick={() => navigate(t.to)}
//                   className="mt-auto w-full rounded-lg text-white py-2 font-medium transition"
//                   style={{ backgroundColor: PRIMARY }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                   type="button"
//                 >
//                   Vào lộ trình
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* ===== FEATURED COURSES (horizontal scroll) ===== */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Khóa học nổi bật</h2>
//           <Link to="/courses" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
//         </div>

//         <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
//           {featuredCourses.map((c) => (
//             <article key={c.id}
//               className="min-w-[280px] max-w-[320px] bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition flex flex-col snap-start"
//               style={{ borderColor: BORDER }}>
//               <img src={c.thumb || "/images/course-placeholder.jpg"} alt={c.title} className="w-full h-40 object-cover" />
//               <div className="p-4 flex-1 flex flex-col">
//                 <h3 className="font-semibold text-[#1a1a1a] line-clamp-2">{c.title}</h3>
//                 <div className="mt-2 text-xs text-[#677788]">Bài học: <b>{c.lessons}</b> • Cấp độ: {c.level}</div>
//                 <button
//                   onClick={() => navigate(`/courses/${c.id}`)}
//                   className="mt-auto w-full rounded-lg text-white py-2 font-medium transition"
//                   style={{ backgroundColor: PRIMARY }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                   type="button"
//                 >
//                   Xem chi tiết
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* ===== USP / FEATURES ===== */}
//       <section className="w-full px-6 lg:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           {[
//             { icon: <Rocket className="w-5 h-5" />, title: "Lộ trình rõ", desc: "Học theo mục tiêu, bám sát kỳ thi thật." },
//             { icon: <Brain className="w-5 h-5" />, title: "Bài giảng cô đọng", desc: "Đi thẳng vào trọng tâm, dễ ghi nhớ." },
//             { icon: <ChartLine className="w-5 h-5" />, title: "Theo dõi tiến độ", desc: "Dashboard & gợi ý ôn mục tiêu." },
//             { icon: <PlayCircle className="w-5 h-5" />, title: "Luyện đề có giải", desc: "Chấm tự động & phân tích kết quả." },
//           ].map((f, i) => (
//             <div key={i} className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
//               <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">{f.icon}</div>
//               <h4 className="mt-3 font-semibold text-[#1a1a1a]">{f.title}</h4>
//               <p className="text-sm text-[#677788] mt-1">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== EXAM SHOWCASE ===== */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h3 className="text-lg lg:text-xl font-extrabold text-[#1a1a1a]">Thư viện đề thi – Luyện là lên!</h3>
//               <p className="text-sm text-[#677788] mt-1">Đề chuẩn hoá, chấm tự động, xem đáp án chi tiết.</p>
//             </div>
//             <Link
//               to="/exam"
//               className="inline-flex items-center gap-2 rounded-lg text-white px-4 py-2 font-semibold transition"
//               style={{ backgroundColor: PRIMARY }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//             >
//               Vào thư viện đề <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
//             {examsShowcase.map((ex) => (
//               <div key={ex.id} className="bg-white border rounded-xl p-4" style={{ borderColor: BORDER }}>
//                 <p className="font-semibold text-[#1a1a1a] line-clamp-2">{ex.title}</p>
//                 <div className="mt-2 text-xs text-[#677788]">⏱️ {ex.duration} phút • {ex.opened ? "Đang mở" : "Đã khóa"}</div>
//                 <button
//                   onClick={() => navigate(`/exam/${ex.id}`)}
//                   className="mt-3 w-full rounded-lg text-white py-2 text-sm font-medium transition"
//                   style={{ backgroundColor: PRIMARY }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                   type="button"
//                 >
//                   Chi tiết
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== METRICS STRIP ===== */}
//       <section className="w-full px-6 lg:px-12">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { label: "Học viên", value: "12,500+" },
//             { label: "Bài học", value: "1,200+" },
//             { label: "Đề thi/Quiz", value: "350+" },
//             { label: "Tỉ lệ hài lòng", value: "97%" },
//           ].map((s, i) => (
//             <div key={i} className="bg-white border rounded-xl p-5 text-center" style={{ borderColor: BORDER }}>
//               <p className="text-2xl font-extrabold text-[#1a1a1a]">{s.value}</p>
//               <p className="text-xs text-[#677788] mt-1">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== TESTIMONIALS ===== */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
//           <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
//             <div className="flex items-center gap-2 mb-2">
//               <Trophy className="w-5 h-5 text-[#1b3ea9]" />
//               <h4 className="font-semibold text-[#1a1a1a]">Học viên nói gì?</h4>
//             </div>
//             <p className="text-[#677788]">
//               “Nhờ lộ trình gợi ý + phần luyện đề có giải chi tiết, mình tăng từ 550 TOEIC lên 785 sau 2 tháng.
//               Dashboard theo dõi tiến độ cực rõ ràng!” — <b>Anh Khoa</b>
//             </p>
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//               {[
//                 "Nội dung cô đọng, dễ theo sát",
//                 "Thống kê rõ điểm yếu để ôn lại",
//                 "Đề mô phỏng giống thi thật",
//                 "Giảng viên phản hồi nhanh",
//               ].map((t, i) => (
//                 <div key={i} className="flex items-center gap-2 text-sm text-[#1a1a1a]">
//                   <CheckCircle2 className="w-4 h-4 text-green-600" /> {t}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white border rounded-2xl overflow-hidden" style={{ borderColor: BORDER }}>
//             <img src="/images/study-banner.jpg" alt="Study Banner" className="w-full h-40 object-cover" />
//           </div>
//         </div>
//       </section>

//       {/* ===== BLOG PREVIEW ===== */}
//       <section className="w-full px-6 lg:px-12">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Bài viết mới</h2>
//           <Link to="/blog" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {blogPosts.map((b) => (
//             <article key={b.id} className="bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition"
//               style={{ borderColor: BORDER }}>
//               <img src={b.cover || "/images/blog-placeholder.jpg"} alt={b.title} className="w-full h-36 object-cover" />
//               <div className="p-4">
//                 <span className="text-xs font-semibold px-2 py-1 rounded bg-[#eef3ff] text-[#1b3ea9]">{b.tag}</span>
//                 <h3 className="mt-2 font-semibold text-[#1a1a1a] line-clamp-2">{b.title}</h3>
//                 <Link to={`/blog/${b.id}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold"
//                   style={{ color: PRIMARY }}>
//                   Đọc tiếp <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* ===== PARTNERS ===== */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
//           <p className="text-center text-sm text-[#677788] mb-4">Đồng hành bởi các đối tác</p>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 place-items-center">
//             {[1,2,3,4,5].map((i) => (
//               <img key={i} src={`/images/partner-${i}.png`} alt={`partner-${i}`}
//                 className="h-8 w-auto object-contain opacity-80" />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== PRICING TEASER ===== */}
//       <section className="w-full px-6 lg:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {[
//             { name: "Free", price: "0đ", lines: ["Bài học mở", "Quiz cơ bản", "Không giới hạn thiết bị"], cta: "Bắt đầu" },
//             { name: "Pro", price: "199k/tháng", highlight: true, lines: ["Tất cả khoá học", "Thư viện đề thi", "Theo dõi tiến độ & gợi ý"], cta: "Nâng cấp" },
//             { name: "Team", price: "Liên hệ", lines: ["Quản trị lớp học", "Báo cáo học viên", "Hỗ trợ triển khai"], cta: "Tư vấn" },
//           ].map((p, i) => (
//             <div key={i}
//               className={`rounded-2xl border p-6 bg-white ${p.highlight ? "ring-2 ring-blue-200" : ""}`}
//               style={{ borderColor: BORDER }}>
//               <div className="flex items-center justify-between">
//                 <h4 className="text-lg font-bold text-[#1a1a1a]">{p.name}</h4>
//                 {p.highlight && <span className="text-xs px-2 py-1 rounded bg-blue-50 text-[#1b3ea9]">Gợi ý</span>}
//               </div>
//               <div className="mt-2 text-2xl font-extrabold text-[#1a1a1a]">{p.price}</div>
//               <ul className="mt-3 text-sm text-[#677788] space-y-1">
//                 {p.lines.map((l, j) => <li key={j} className="flex gap-2"><span>•</span><span>{l}</span></li>)}
//               </ul>
//               <button
//                 className="mt-4 w-full rounded-lg text-white py-2 font-medium transition"
//                 style={{ backgroundColor: PRIMARY }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//                 onClick={() => navigate("/membership")}
//                 type="button"
//               >
//                 {p.cta}
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== NEWSLETTER ===== */}
//       <section className="w-full px-6 lg:px-12 py-10">
//         <div className="bg-white border rounded-2xl p-6 lg:p-8" style={{ borderColor: BORDER }}>
//           <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef3ff] text-[#1b3ea9] text-sm font-semibold">
//                 <Wand2 className="w-4 h-4" /> Nhận tips học mỗi tuần
//               </div>
//               <h3 className="mt-3 text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Đăng ký nhận bản tin</h3>
//               <p className="text-[#677788] mt-1">Cập nhật bài viết hay, đề mới & ưu đãi dành riêng cho bạn.</p>
//             </div>
//             <form
//               className="flex gap-2"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 alert("Đã đăng ký! 🎉");
//               }}
//             >
//               <input type="email" required placeholder="Nhập email của bạn"
//                 className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none"
//                 style={{ borderColor: BORDER }} />
//               <button
//                 className="rounded-lg text-white px-5 py-3 font-semibold transition"
//                 style={{ backgroundColor: PRIMARY }}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//               >
//                 Đăng ký
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* ===== FAQ ===== */}
//       <section className="w-full px-6 lg:px-12 pb-12">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
//           <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
//             <h3 className="text-xl font-extrabold text-[#1a1a1a]">Câu hỏi thường gặp</h3>
//             <p className="text-sm text-[#677788] mt-1">
//               Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình học. Nếu chưa thấy câu trả lời, hãy liên hệ.
//             </p>
//             <Link to="/support" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold"
//               style={{ color: PRIMARY }}>
//               Trung tâm hỗ trợ <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           <div className="bg-white border rounded-2xl p-2" style={{ borderColor: BORDER }}>
//             {faqs.map((f, idx) => (
//               <div key={idx} className="border-b last:border-none" style={{ borderColor: BORDER }}>
//                 <button
//                   className="w-full flex items-center justify-between text-left px-4 py-4"
//                   onClick={() => setFaqs(s => s.map((x, i) => i === idx ? ({ ...x, open: !x.open }) : x))}
//                   type="button"
//                 >
//                   <span className="font-medium text-[#1a1a1a]">{f.q}</span>
//                   <ChevronDown className={`w-5 h-5 transition ${f.open ? "rotate-180" : ""}`} />
//                 </button>
//                 {f.open && (
//                   <div className="px-4 pb-4 text-sm text-[#677788]">
//                     {f.a}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== FINAL CTA ===== */}
//       <section className="w-full px-6 lg:px-12 pb-12">
//         <div className="bg-white border rounded-2xl p-6 lg:p-8 text-center" style={{ borderColor: BORDER }}>
//           <h3 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Sẵn sàng bắt đầu hành trình mới?</h3>
//           <p className="text-[#677788] mt-2">Chọn khoá học phù hợp, luyện đề đều đặn và theo dõi tiến bộ mỗi ngày.</p>
//           <div className="mt-5 flex items-center justify-center gap-3">
//             <Link
//               to="/courses"
//               className="inline-flex items-center gap-2 rounded-lg text-white px-5 py-3 font-semibold transition"
//               style={{ backgroundColor: PRIMARY }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
//             >
//               Khám phá khoá học
//             </Link>
//             <Link
//               to="/exam"
//               className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold border"
//               style={{ borderColor: BORDER, color: "#1a1a1a" }}
//             >
//               Tới thư viện đề
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }






















































// src/pages/Homepage.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ArrowRight, BadgeCheck, BookOpen, Brain, ChartLine,
  CheckCircle2, ChevronDown, Library, PlayCircle, Rocket,
  Shield, Stars, Timer, Trophy, Wand2
} from "lucide-react";
import { http } from "../../utils/http";

const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";
const BORDER = "#e0e0e0";
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

/** Helpers: map dữ liệu API -> UI an toàn */
const pick = (obj, keys) => keys.reduce((o, k) => (o[k] = obj?.[k], o), {});
const normCourse = (c) => ({
  id: c?.id ?? c?.courseId ?? String(Math.random()),
  title: c?.title ?? c?.name ?? "Khóa học",
  desc: c?.description ?? c?.shortDescription ?? "",
  lessons: c?.lessonsCount ?? c?.totalLessons ?? c?.lessons?.length ?? "—",
  level: c?.level ?? c?.difficulty ?? "All levels",
  thumb: c?.thumbnailUrl ?? c?.imageUrl ?? "/images/course-placeholder.jpg",
});
const normExam = (e) => ({
  id: e?.id ?? e?.examId ?? String(Math.random()),
  title: e?.title ?? "Đề thi",
  duration: e?.durationMinutes ?? e?.timeLimit ?? 0,
  opened: e?.isOpened ?? e?.isOpen ?? true,
});
const normPost = (p) => ({
  id: p?.id ?? p?.postId ?? String(Math.random()),
  title: p?.title ?? "Bài viết",
  tag: p?.tag ?? p?.category ?? "Blog",
  cover: p?.coverImage ?? p?.thumbnail ?? "/images/blog-placeholder.jpg",
});

/** FAQ mặc định */
const faqsDefault = [
  { q: "Học trên nền tảng này cần chuẩn bị gì?", a: "Chỉ cần máy tính/điện thoại có internet. Bạn có thể học mọi lúc – mọi nơi, nền tảng hỗ trợ đồng bộ tiến độ." },
  { q: "Khoá học có thời hạn không?", a: "Tuỳ gói thành viên và khoá học. Với gói thành viên, bạn có thể truy cập toàn bộ thư viện trong thời hạn gói." },
  { q: "Đề thi có đáp án & giải chi tiết?", a: "Có. Sau khi nộp bài, bạn xem lại đáp án đúng/sai, giải thích và thống kê để ôn lại." },
  { q: "Tôi có thể học theo lộ trình gợi ý?", a: "Có. Mỗi mục tiêu có lộ trình gồm bài học + luyện tập + đề mô phỏng. Bạn theo dõi tiến độ ở Dashboard." },
];

export default function Homepage() {
  const navigate = useNavigate();

  // ==== State ====
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ courses: null, exams: null, posts: null });

  const [courses, setCourses] = useState([]);      // từ /api/courses (hoặc /api/courses/search)
  const [exams, setExams] = useState([]);          // từ /api/exam
  const [posts, setPosts] = useState([]);          // từ /api/Posts
  const [faqs, setFaqs] = useState(() => faqsDefault.map((f, i) => ({ ...f, open: i === 0 })));

  // ==== Fetch initial ====
  useEffect(() => {
    let ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErrors({ courses: null, exams: null, posts: null });

        // Courses
        const cRes = await http(`${API_BASE}/api/courses`, { signal: ac.signal, headers: { accept: "*/*" } });
        const cJson = cRes.ok ? await cRes.json() : [];
        const cArr = Array.isArray(cJson?.data ?? cJson) ? (cJson.data ?? cJson) : [];
        setCourses(cArr.map(normCourse));

        // Exams
        const eRes = await http(`${API_BASE}/api/exam`, { signal: ac.signal, headers: { accept: "*/*" } });
        const eJson = eRes.ok ? await eRes.json() : [];
        const eArr = Array.isArray(eJson?.data ?? eJson) ? (eJson.data ?? eJson) : [];
        setExams(eArr.map(normExam));

        // Posts
        const pRes = await http(`${API_BASE}/api/Posts`, { signal: ac.signal, headers: { accept: "*/*" } });
        const pJson = pRes.ok ? await pRes.json() : [];
        const pArr = Array.isArray(pJson?.data ?? pJson) ? (pJson.data ?? pJson) : [];
        setPosts(pArr.map(normPost));
      } catch (e) {
        // Ghi lỗi nhẹ cho từng phần (không chặn toàn trang)
        setErrors((prev) => ({ ...prev, general: e?.message || "Fetch error" }));
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // ==== Search courses (enter hoặc bấm) ====
  const doSearch = async () => {
    if (!q.trim()) return navigate(`/courses`);
    try {
      setLoading(true);
      setErrors((prev) => ({ ...prev, courses: null }));
      const res = await http(`${API_BASE}/api/courses/search?q=${encodeURIComponent(q.trim())}`, {
        headers: { accept: "*/*" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const arr = Array.isArray(data?.data ?? data) ? (data.data ?? data) : [];
      setCourses(arr.map(normCourse));
    } catch (e) {
      setErrors((prev) => ({ ...prev, courses: e?.message || "Search error" }));
    } finally {
      setLoading(false);
    }
  };

  // ==== Derived (cắt bớt để trình bày) ====
  const featuredCourses = useMemo(() => courses.slice(0, 8), [courses]);
  const examsShowcase = useMemo(() => exams.slice(0, 3), [exams]);
  const blogPosts = useMemo(() => posts.slice(0, 3), [posts]);

  // ==== Constant sections không cần API ====
  const categories = useMemo(
    () => [
      { icon: <BookOpen className="w-5 h-5" />, label: "Khóa học", to: "/courses", desc: "Lộ trình rõ ràng" },
      { icon: <Library className="w-5 h-5" />, label: "Thư viện đề thi", to: "/exam", desc: "Đáp án chi tiết" },
      { icon: <Timer className="w-5 h-5" />, label: "Luyện tập nhanh", to: "/s/quick-practice", desc: "Quiz 5-10 phút" },
      { icon: <PlayCircle className="w-5 h-5" />, label: "Gói thành viên", to: "/membership", desc: "Tiết kiệm 60%" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="relative w-full px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#35509a] font-semibold mb-2">PTIT E-Learning</p>
            <h1 className="text-[30px] leading-[1.2] lg:text-[44px] font-extrabold text-[#1a1a1a]">
              Học thông minh – Luyện đề hiệu quả – Theo dõi tiến độ rõ ràng
            </h1>
            <p className="mt-4 text-[#677788] max-w-2xl">
              Lộ trình rõ ràng, video cô đọng, bài tập tương tác, đề mô phỏng sát format. Kèm thống kê cá nhân giúp bạn học trúng điểm yếu.
            </p>

            {/* Search */}
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Tìm khóa học, đề thi, chủ đề…"
                className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: BORDER }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
              />
              <button
                className="rounded-lg text-white px-5 py-3 font-semibold transition"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                onClick={doSearch}
              >
                Tìm kiếm
              </button>
            </div>

            {/* Stats badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#677788]">
              <span className="inline-flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-green-600" /> Nội dung cập nhật hàng tuần</span>
              <span className="inline-flex items-center gap-1"><Shield className="w-4 h-4 text-green-600" /> Hệ thống ổn định</span>
              <span className="inline-flex items-center gap-1"><Stars className="w-4 h-4 text-yellow-600" /> 97% học viên hài lòng</span>
            </div>
          </div>

          {/* Visual */}
          <div className="rounded-2xl overflow-hidden border shadow-sm">
            <img src="/hero-ielts.jpg" alt="Elearning Hero" className="w-full h-[280px] lg:h-[360px] object-cover" />
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.to} to={c.to}
              className="bg-white border rounded-xl p-4 hover:shadow-sm transition flex items-center gap-3"
              style={{ borderColor: BORDER }}>
              <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">{c.icon}</div>
              <div>
                <p className="font-semibold text-[#1a1a1a]">{c.label}</p>
                <p className="text-xs text-[#677788]">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED COURSES (từ API) ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Khóa học nổi bật</h2>
          <Link to="/courses" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
        </div>

        {errors.courses && (
          <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
            Không thể tải khoá học (chi tiết: {errors.courses})
          </div>
        )}

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {(loading && featuredCourses.length === 0 ? Array.from({ length: 4 }) : featuredCourses).map((c, idx) => (
            <article key={c?.id ?? idx}
              className="min-w-[280px] max-w-[320px] bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition flex flex-col snap-start"
              style={{ borderColor: BORDER }}>
              <div className="w-full h-40 bg-gray-100">
                {c ? (
                  <img src={c.thumb} alt={c.title} className="w-full h-40 object-cover" />
                ) : null}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-[#1a1a1a] line-clamp-2">{c?.title || "—"}</h3>
                <p className="text-sm text-[#677788] mt-1 line-clamp-3">{c?.desc || ""}</p>
                <div className="mt-2 text-xs text-[#677788]">Bài học: <b>{c?.lessons ?? "—"}</b> • Cấp độ: {c?.level ?? "—"}</div>
                <button
                  onClick={() => navigate(`/courses/${c?.id}`)}
                  className="mt-auto w-full rounded-lg text-white py-2 font-medium transition"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                  type="button"
                  disabled={!c}
                >
                  Xem chi tiết
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== USP / FEATURES ===== */}
      <section className="w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[
            { icon: <Rocket className="w-5 h-5" />, title: "Lộ trình rõ", desc: "Học theo mục tiêu, bám sát kỳ thi thật." },
            { icon: <Brain className="w-5 h-5" />, title: "Bài giảng cô đọng", desc: "Đi thẳng vào trọng tâm, dễ ghi nhớ." },
            { icon: <ChartLine className="w-5 h-5" />, title: "Theo dõi tiến độ", desc: "Dashboard & gợi ý ôn mục tiêu." },
            { icon: <PlayCircle className="w-5 h-5" />, title: "Luyện đề có giải", desc: "Chấm tự động & phân tích kết quả." },
          ].map((f, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
              <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">{f.icon}</div>
              <h4 className="mt-3 font-semibold text-[#1a1a1a]">{f.title}</h4>
              <p className="text-sm text-[#677788] mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXAM SHOWCASE (từ API) ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg lg:text-xl font-extrabold text-[#1a1a1a]">Thư viện đề thi – Luyện là lên!</h3>
              <p className="text-sm text-[#677788] mt-1">Đề chuẩn hoá, chấm tự động, xem đáp án chi tiết.</p>
            </div>
            <Link
              to="/exam"
              className="inline-flex items-center gap-2 rounded-lg text-white px-4 py-2 font-semibold transition"
              style={{ backgroundColor: PRIMARY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Vào thư viện đề <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {errors.exams && (
            <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 my-4">
              Không thể tải danh sách đề thi (chi tiết: {errors.exams})
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {(loading && examsShowcase.length === 0 ? Array.from({ length: 3 }) : examsShowcase).map((ex, idx) => (
              <div key={ex?.id ?? idx} className="bg-white border rounded-xl p-4" style={{ borderColor: BORDER }}>
                <p className="font-semibold text-[#1a1a1a] line-clamp-2">{ex?.title || "—"}</p>
                <div className="mt-2 text-xs text-[#677788]">⏱️ {ex?.duration ?? "—"} phút • {ex?.opened ? "Đang mở" : "Đã khóa"}</div>
                <button
                  onClick={() => navigate(`/exam/${ex?.id}`)}
                  className="mt-3 w-full rounded-lg text-white py-2 text-sm font-medium transition"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                  type="button"
                  disabled={!ex}
                >
                  Chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METRICS STRIP ===== */}
      <section className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Học viên", value: "12,500+" },
            { label: "Bài học", value: "1,200+" },
            { label: "Đề thi/Quiz", value: "350+" },
            { label: "Tỉ lệ hài lòng", value: "97%" },
          ].map((s, i) => (
            <div key={i} className="bg-white border rounded-xl p-5 text-center" style={{ borderColor: BORDER }}>
              <p className="text-2xl font-extrabold text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#677788] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-[#1b3ea9]" />
              <h4 className="font-semibold text-[#1a1a1a]">Học viên nói gì?</h4>
            </div>
            <p className="text-[#677788]">
              “Nhờ lộ trình gợi ý + phần luyện đề có giải chi tiết, mình tăng từ 550 TOEIC lên 785 sau 2 tháng.
              Dashboard theo dõi tiến độ cực rõ ràng!” — <b>Anh Khoa</b>
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Nội dung cô đọng, dễ theo sát",
                "Thống kê rõ điểm yếu để ôn lại",
                "Đề mô phỏng giống thi thật",
                "Giảng viên phản hồi nhanh",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#1a1a1a]">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-2xl overflow-hidden" style={{ borderColor: BORDER }}>
            <img src="/images/study-banner.jpg" alt="Study Banner" className="w-full h-40 object-cover" />
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW (từ API) ===== */}
      <section className="w-full px-6 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Bài viết mới</h2>
          <Link to="/blog" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
        </div>

        {errors.posts && (
          <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
            Không thể tải bài viết (chi tiết: {errors.posts})
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(loading && blogPosts.length === 0 ? Array.from({ length: 3 }) : blogPosts).map((b, idx) => (
            <article key={b?.id ?? idx} className="bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition"
              style={{ borderColor: BORDER }}>
              <div className="w-full h-36 bg-gray-100">
                {b ? <img src={b.cover} alt={b.title} className="w-full h-36 object-cover" /> : null}
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-[#eef3ff] text-[#1b3ea9]">{b?.tag ?? "Blog"}</span>
                <h3 className="mt-2 font-semibold text-[#1a1a1a] line-clamp-2">{b?.title ?? "—"}</h3>
                <Link to={`/blog/${b?.id}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: PRIMARY }}>
                  Đọc tiếp <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="bg-white border rounded-2xl p-6 lg:p-8" style={{ borderColor: BORDER }}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef3ff] text-[#1b3ea9] text-sm font-semibold">
                <Wand2 className="w-4 h-4" /> Nhận tips học mỗi tuần
              </div>
              <h3 className="mt-3 text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Đăng ký nhận bản tin</h3>
              <p className="text-[#677788] mt-1">Cập nhật bài viết hay, đề mới & ưu đãi dành riêng cho bạn.</p>
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Đã đăng ký! 🎉");
              }}
            >
              <input type="email" required placeholder="Nhập email của bạn"
                className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: BORDER }} />
              <button
                className="rounded-lg text-white px-5 py-3 font-semibold transition"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
            <h3 className="text-xl font-extrabold text-[#1a1a1a]">Câu hỏi thường gặp</h3>
            <p className="text-sm text-[#677788] mt-1">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình học. Nếu chưa thấy câu trả lời, hãy liên hệ.
            </p>
            <Link to="/support" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: PRIMARY }}>
              Trung tâm hỗ trợ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white border rounded-2xl p-2" style={{ borderColor: BORDER }}>
            {faqs.map((f, idx) => (
              <div key={idx} className="border-b last:border-none" style={{ borderColor: BORDER }}>
                <button
                  className="w-full flex items-center justify-between text-left px-4 py-4"
                  onClick={() => setFaqs(s => s.map((x, i) => i === idx ? ({ ...x, open: !x.open }) : x))}
                  type="button"
                >
                  <span className="font-medium text-[#1a1a1a]">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 transition ${f.open ? "rotate-180" : ""}`} />
                </button>
                {f.open && (
                  <div className="px-4 pb-4 text-sm text-[#677788]">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="w-full px-6 lg:px-12 pb-12">
        <div className="bg-white border rounded-2xl p-6 lg:p-8 text-center" style={{ borderColor: BORDER }}>
          <h3 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Sẵn sàng bắt đầu hành trình mới?</h3>
          <p className="text-[#677788] mt-2">Chọn khoá học phù hợp, luyện đề đều đặn và theo dõi tiến bộ mỗi ngày.</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg text-white px-5 py-3 font-semibold transition"
              style={{ backgroundColor: PRIMARY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Khám phá khoá học
            </Link>
            <Link
              to="/exam"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold border"
              style={{ borderColor: BORDER, color: "#1a1a1a" }}
            >
              Tới thư viện đề
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
