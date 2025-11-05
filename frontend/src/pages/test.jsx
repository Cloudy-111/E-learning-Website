
// HOME PAGE

// "use client"

// import { useState } from "react"
// import { ChevronLeft, ChevronRight, Clock, Users, Tag, Phone, Mail, MapPin } from "lucide-react"

// export default function Study4Homepage() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     region: "",
//     subject: "",
//   })

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
//   ]

//   const latestTests = [
//     {
//       id: 1,
//       title: "IELTS Simulation Listening test 1",
//       duration: "40 phút",
//       views: 1269753,
//       attempts: 3379,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 2,
//       title: "IELTS Simulation Listening test 10",
//       duration: "40 phút",
//       views: 426969,
//       attempts: 1045,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 3,
//       title: "IELTS Simulation Listening test 2",
//       duration: "40 phút",
//       views: 528429,
//       attempts: 972,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 4,
//       title: "IELTS Simulation Listening test 3",
//       duration: "40 phút",
//       views: 346089,
//       attempts: 559,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 5,
//       title: "IELTS Simulation Listening test 4",
//       duration: "40 phút",
//       views: 269931,
//       attempts: 495,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 6,
//       title: "IELTS Simulation Listening test 5",
//       duration: "40 phút",
//       views: 238410,
//       attempts: 376,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 7,
//       title: "IELTS Simulation Listening test 6",
//       duration: "40 phút",
//       views: 213135,
//       attempts: 388,
//       parts: 4,
//       questions: 40,
//     },
//     {
//       id: 8,
//       title: "IELTS Simulation Listening test 7",
//       duration: "40 phút",
//       views: 153807,
//       attempts: 279,
//       parts: 4,
//       questions: 40,
//     },
//   ]

//   const handleFormChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFormSubmit = (e) => {
//     e.preventDefault()
//     console.log("Form submitted:", formData)
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % courses.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length)
//   }

//   return (
//     <div className="w-full bg-white">
//       {/* Header */}
//       <header className="w-full bg-white border-b border-gray-200">
//         <div className="w-full px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
//               S
//             </div>
//             <span className="text-xl font-bold text-gray-900">STUDY4</span>
//           </div>
//           <nav className="flex items-center gap-8">
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
//               Giới thiệu
//             </a>
//             <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
//               Chương trình học
//             </a>
//             <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
//               Đề thi online
//             </a>
//             <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
//               Flashcards
//             </a>
//             <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
//               Blog
//             </a>
//             <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
//               Kích hoạt tài khoản
//             </a>
//           </nav>
//           <button className="text-sm text-gray-600 hover:text-gray-900">Đăng nhập</button>
//         </div>
//       </header>

//       {/* Hero Carousel */}
//       <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-12">
//         <div className="w-full px-6">
//           <div className="relative flex items-center justify-center gap-4">
//             <button onClick={prevSlide} className="p-2 hover:bg-white rounded-full transition">
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

//             <button onClick={nextSlide} className="p-2 hover:bg-white rounded-full transition">
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
//           <div className="max-w-4xl">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Về STUDY4</h2>
//             <p className="text-gray-700 mb-4 leading-relaxed">
//               Các phần mềm luyện thi IELTS, TOEIC, HSK online chất lượng cao của STUDY4 đều được thiết kế sát format thi
//               thật, theo chương trình chuẩn CEFR (A1-C2) của đại học Cambridge và Oxford (Anh) với nhiều tính năng và hệ
//               thống bài tập phong phú đa dạng.
//             </p>
//             <p className="text-gray-700 leading-relaxed">
//               Phần mềm luyện thi bao gồm các tính năng chuyên sâu và lộ trình luyện thi cá nhân hóa để chinh phục các
//               mốc điểm quan trọng. STUDY4 áp dụng những công nghệ tối ưu vào học tập như spaced-repetition để ôn tập
//               flashcards, AI để chấm chữa phát âm và bài thi nói/viết. Toàn bộ quá trình luyện thi của bạn sẽ được thống
//               kê chi tiết theo ngày và theo từng dạng câu hỏi để có thể dễ dàng theo dõi tiến độ và điều chỉnh lộ trình
//               ôn tập một cách phù hợp.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Consultation Form */}
//       <section className="w-full bg-white py-12 border-b border-gray-200">
//         <div className="w-full px-6">
//           <div className="max-w-2xl">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">Tư vấn lộ trình học</h2>
//             <form onSubmit={handleFormSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">Họ tên *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">Số điện thoại *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">Khu vực học (thành phố/tỉnh) *</label>
//                 <input
//                   type="text"
//                   name="region"
//                   value={formData.region}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">Môn học bạn quan tâm</label>
//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 >
//                   <option value="">Chọn môn học</option>
//                   <option value="ielts">IELTS</option>
//                   <option value="toeic">TOEIC</option>
//                   <option value="hsk">HSK</option>
//                 </select>
//               </div>
//               <p className="text-sm text-gray-600">Bạn có thể học thử miễn phí trước khi đăng ký.</p>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
//               >
//                 Đăng ký tư vấn miễn phí
//               </button>
//             </form>
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
//                     <span>
//                       {test.views.toLocaleString()} | {test.attempts}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Tag className="w-4 h-4" />
//                     <span>
//                       {test.parts} phần thi | {test.questions} câu hỏi
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 mb-3">
//                   <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
//                     #IELTS Academic
//                   </span>
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
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Cộng đồng học tập STUDY4</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <h3 className="text-lg font-bold text-gray-900">Luyện thi IELTS, TOEIC, HSK, TOPIK ... không giới hạn</h3>
//               <p className="text-gray-700">và hơn 1 triệu học viên hoạt động mỗi tháng</p>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex gap-3">
//                   <span className="text-blue-600">✓</span>
//                   <span>Cộng đồng học tiếng Anh và luyện thi sôi nổi với hơn 1 triệu học viên mỗi tháng</span>
//                 </li>
//                 <li className="flex gap-3">
//                   <span className="text-blue-600">✓</span>
//                   <span>Đặt câu hỏi cho đội ngũ trợ giảng cũng như các học viên khác để nhận giải đáp sau 30 phút</span>
//                 </li>
//                 <li className="flex gap-3">
//                   <span className="text-blue-600">✓</span>
//                   <span>Chia sẻ kinh nghiệm học tập và làm bài thi với các thành viên khác</span>
//                 </li>
//                 <li className="flex gap-3">
//                   <span className="text-blue-600">✓</span>
//                   <span>Luyện tập kỹ năng nói & viết và nhận được nhận xét, chấm điểm từ bạn học và giáo viên</span>
//                 </li>
//               </ul>
//               <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
//                 Bắt đầu luyện thi
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
//       <footer className="w-full bg-gray-900 text-gray-300 py-12">
//         <div className="w-full px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
//                   S
//                 </div>
//                 <span className="text-lg font-bold text-white">STUDY4</span>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <p>© STUDY4.COM</p>
//                 <p>Bản quyền của Công ty TNHH Công Nghệ A Plus</p>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold text-white mb-4">Về STUDY4</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-white mb-4">Tài nguyên</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản và Điều Kiện
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-white mb-4">Chính sách chung</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách kiểm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách giao, nhận hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách chuyển đổi, hoàn hủy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 pt-8">
//             <h4 className="font-bold text-white mb-4">Thông tin doanh nghiệp</h4>
//             <div className="space-y-2 text-sm">
//               <p>
//                 <strong>CÔNG TY TNHH CÔNG NGHỆ A PLUS</strong>
//               </p>
//               <div className="flex items-center gap-2">
//                 <Phone className="w-4 h-4" />
//                 <span>Điện thoại liên hệ/Hotline: 096 369 5525</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 <span>Email: study4.team@gmail.com</span>
//               </div>
//               <div className="flex items-start gap-2">
//                 <MapPin className="w-4 h-4 mt-1" />
//                 <span>
//                   Địa chỉ trụ sở: Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt
//                   Nam
//                 </span>
//               </div>
//               <p>Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp</p>
//               <p>Ngày cấp phép: 17/06/2021</p>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 mt-8 pt-8 text-xs text-gray-400">
//             <p className="mb-2">
//               IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//               Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//               Cambridge ESOL, the British Council, and IDP Education Australia.
//             </p>
//             <p>
//               ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//               not endorsed or approved by ETS.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }






































































// ABOUT


// "use client"

// import { useState } from "react"
// import { Menu, X, User } from "lucide-react"

// export default function Study4About() {
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
































































// KHOÁ HỌC
// "use client"

// import { useState } from "react"
// import { Menu, X } from "lucide-react"

// export default function Study4Courses() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     region: "",
//     course: "",
//   })

//   const courses = {
//     combo: [
//       {
//         id: 1,
//         title: "Combo TOEIC 4 kỹ năng [Tặng TED Talks]",
//         reviews: 328,
//         students: 36826,
//         tag: "#Phần mềm online",
//         originalPrice: 3600000,
//         discountedPrice: 1525000,
//         discount: 57,
//       },
//       {
//         id: 2,
//         title: "Combo 4 kỹ năng IELTS Intensive [Tặng TED Talks]",
//         reviews: 1618,
//         students: 98671,
//         tag: "#Phần mềm online",
//         originalPrice: 3596000,
//         discountedPrice: 1525000,
//         discount: 57,
//       },
//       {
//         id: 3,
//         title: "Combo Advanced IELTS Intensive kèm chấm chữa giáo viên bản ngữ [Tặng TED Talks]",
//         reviews: 680,
//         students: 107333,
//         tag: "#Phần mềm online",
//         originalPrice: 5346000,
//         discountedPrice: 2925000,
//         discount: 45,
//       },
//       {
//         id: 4,
//         title: "Combo lộ trình IELTS từ 0-7+ kèm chấm chữa giáo viên bản ngữ [Tặng TED Talks]",
//         reviews: 891,
//         students: 123668,
//         tag: "#Phần mềm online",
//         originalPrice: 6245000,
//         discountedPrice: 3325000,
//         discount: 46,
//       },
//       {
//         id: 5,
//         title: "Combo Practical English - Thực hành tiếng Anh online [Tặng TED Talks]",
//         reviews: 252,
//         students: 4601,
//         tag: "#Phần mềm online",
//         originalPrice: 2097000,
//         discountedPrice: 989000,
//         discount: 52,
//       },
//     ],
//     toeic: [
//       {
//         id: 6,
//         title:
//           "[Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation [Tặng khoá TED Talks]",
//         reviews: 68,
//         students: 223,
//         tag: "#Phần mềm online",
//         originalPrice: 1800000,
//         discountedPrice: 989000,
//         discount: 45,
//       },
//       {
//         id: 7,
//         title: "[TOEIC SW] TOEIC Speaking and Writing [Tặng khóa TED Talks]",
//         reviews: 260,
//         students: 36603,
//         tag: "#Phần mềm online",
//         originalPrice: 1800000,
//         discountedPrice: 989000,
//         discount: 45,
//       },
//     ],
//     ieltsAcademic: [
//       {
//         id: 8,
//         title: "[IELTS Fundamentals] Từ vựng và ngữ pháp cơ bản IELTS",
//         reviews: 211,
//         students: 16335,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//       {
//         id: 9,
//         title:
//           "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
//         reviews: 136,
//         students: 32536,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//       {
//         id: 10,
//         title: "[IELTS Intensive Reading] Chiến lược làm bài - Chữa đề - Từ vựng IELTS Reading",
//         reviews: 222,
//         students: 30506,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//       {
//         id: 11,
//         title: "[IELTS Intensive Speaking] Thực hành luyện tập IELTS Speaking",
//         reviews: 96,
//         students: 17530,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//       {
//         id: 12,
//         title: "[IELTS Intensive Writing] Thực hành luyện tập IELTS Writing",
//         reviews: 176,
//         students: 18099,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//     ],
//     ieltsGeneral: [
//       {
//         id: 13,
//         title: "[IELTS General Training] Intensive Reading: Từ Vựng - Chiến Lược Làm Bài - Chữa đề chi tiết",
//         reviews: 64,
//         students: 698,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//       {
//         id: 14,
//         title: "[IELTS General Training] Intensive Writing: Thực hành luyện tập Writing GT",
//         reviews: 69,
//         students: 296,
//         tag: "#Phần mềm online",
//         originalPrice: 899000,
//         discountedPrice: 699000,
//         discount: 22,
//       },
//     ],
//     ieltsWritingSpeaking: [
//       {
//         id: 15,
//         title: "[Gói chấm chữa] Advanced IELTS Writing & Speaking (Target 6.5+)",
//         reviews: 50,
//         students: 8662,
//         tag: "#Gói chấm chữa",
//         originalPrice: 500000,
//         discountedPrice: 320000,
//         discount: 36,
//         isPricePerItem: true,
//       },
//     ],
//     basicEnglish: [
//       {
//         id: 16,
//         title: "[Practical English] Luyện nghe nói tiếng Anh cùng TED Talks",
//         reviews: 65,
//         students: 985,
//         tag: "#Phần mềm online",
//         originalPrice: 699000,
//         discountedPrice: 599000,
//         discount: 14,
//       },
//       {
//         id: 17,
//         title: "[Practical English] 3600 từ vựng tiếng Anh thông dụng",
//         reviews: 5,
//         students: 36933,
//         tag: "#Phần mềm online",
//         originalPrice: 699000,
//         discountedPrice: 599000,
//         discount: 14,
//       },
//       {
//         id: 18,
//         title: "[Practical English] Ngữ pháp tiếng Anh từ A-Z",
//         reviews: 60,
//         students: 1023,
//         tag: "#Phần mềm online",
//         originalPrice: 699000,
//         discountedPrice: 599000,
//         discount: 14,
//       },
//       {
//         id: 19,
//         title: "[Practical English] Học phát âm và thực hành giao tiếp tiếng Anh",
//         reviews: 7,
//         students: 229,
//         tag: "#Phần mềm online",
//         originalPrice: 699000,
//         discountedPrice: 599000,
//         discount: 14,
//       },
//       {
//         id: 20,
//         title: "[Practical English] Học tiếng Anh qua bài hát",
//         reviews: 127,
//         students: 2593,
//         tag: "#Phần mềm online",
//         originalPrice: 699000,
//         discountedPrice: 599000,
//         discount: 14,
//       },
//     ],
//     hsk: [
//       {
//         id: 21,
//         title: "HSK 1+2 - Tiếng Trung cơ bản",
//         reviews: 33,
//         students: 261,
//         tag: "#Phần mềm online",
//         originalPrice: 989000,
//         discountedPrice: 699000,
//         discount: 29,
//       },
//       {
//         id: 22,
//         title: "Chinh phục HSK 3",
//         reviews: 23,
//         students: 316,
//         tag: "#Phần mềm online",
//         originalPrice: 989000,
//         discountedPrice: 699000,
//         discount: 29,
//       },
//       {
//         id: 23,
//         title: "Chinh phục HSK 4",
//         reviews: 35,
//         students: 593,
//         tag: "#Phần mềm online",
//         originalPrice: 989000,
//         discountedPrice: 699000,
//         discount: 29,
//       },
//       {
//         id: 24,
//         title: "Chinh phục HSK 5",
//         reviews: 40,
//         students: 134,
//         tag: "#Phần mềm online",
//         originalPrice: 989000,
//         discountedPrice: 699000,
//         discount: 29,
//       },
//       {
//         id: 25,
//         title: "Chinh phục HSK 6",
//         reviews: 27,
//         students: 419,
//         tag: "#Phần mềm online",
//         originalPrice: 989000,
//         discountedPrice: 699000,
//         discount: 29,
//       },
//     ],
//   }

//   const categories = [
//     { id: "all", label: "Tất cả" },
//     { id: "combo", label: "Combo" },
//     { id: "toeic", label: "TOEIC" },
//     { id: "ieltsAcademic", label: "IELTS Academic" },
//     { id: "ieltsGeneral", label: "IELTS General" },
//     { id: "ieltsWritingSpeaking", label: "IELTS Writing and Speaking" },
//     { id: "basicEnglish", label: "Tiếng Anh cơ bản" },
//     { id: "hsk", label: "HSK" },
//   ]

//   const getDisplayedCourses = () => {
//     if (selectedCategory === "all") {
//       return Object.values(courses).flat()
//     }
//     return courses[selectedCategory] || []
//   }

//   const handleFormChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFormSubmit = (e) => {
//     e.preventDefault()
//     console.log("Form submitted:", formData)
//   }

//   const formatPrice = (price) => {
//     return price.toLocaleString("vi-VN") + "đ"
//   }

//   const CourseCard = ({ course }) => (
//     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 min-h-10">{course.title}</h3>

//         <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
//           <span>⭐ ({course.reviews})</span>
//           <span>👥 {course.students.toLocaleString("vi-VN")} Học viên</span>
//         </div>

//         <div className="mb-3">
//           <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{course.tag}</span>
//         </div>

//         <div className="mb-4">
//           {course.isPricePerItem ? (
//             <div>
//               <div className="text-xs text-gray-500 mb-1">Giá chỉ từ:</div>
//               <div className="flex items-baseline gap-2">
//                 <span className="text-lg font-bold text-gray-900">{formatPrice(course.discountedPrice)}</span>
//                 <span className="text-xs text-gray-500 line-through">{formatPrice(course.originalPrice)}</span>
//                 <span className="text-xs font-semibold text-red-600">-{course.discount}%</span>
//               </div>
//               <div className="text-xs text-gray-500">/bài</div>
//             </div>
//           ) : (
//             <div className="flex items-baseline gap-2">
//               <span className="text-lg font-bold text-gray-900">{formatPrice(course.discountedPrice)}</span>
//               <span className="text-xs text-gray-500 line-through">{formatPrice(course.originalPrice)}</span>
//               <span className="text-xs font-semibold text-red-600">-{course.discount}%</span>
//             </div>
//           )}
//         </div>

//         <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-50 transition-colors">
//           Xem chi tiết
//         </button>
//       </div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="w-full px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">S</div>
//               <span className="font-bold text-lg text-gray-900">STUDY4</span>
//             </div>

//             <nav className="hidden md:flex items-center gap-8">
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
//                 Giới thiệu
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
//                 Chương trình học
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
//                 Đề thi online
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
//                 Flashcards
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
//                 Blog
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
//                 Kích hoạt tài khoản
//               </a>
//             </nav>

//             <div className="flex items-center gap-4">
//               <button className="hidden md:block w-10 h-10 bg-gray-900 rounded-full"></button>
//               <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="w-full bg-white py-12 px-4">
//         <div className="w-full">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Phần mềm luyện thi online</h1>
//           <p className="text-gray-700 text-lg leading-relaxed mb-6">
//             Các phần mềm luyện thi IELTS, TOEIC, HSK online chất lượng cao của STUDY4 đều được thiết kế sát format thi
//             thật, theo chương trình chuẩn CEFR (A1-C2) của đại học Cambridge và Oxford (Anh) với nhiều tính năng và hệ
//             thống bài tập phong phú đa dạng.
//           </p>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             Phần mềm luyện thi bao gồm các tính năng chuyên sâu và lộ trình luyện thi cá nhân hóa để chinh phục các mốc
//             điểm quan trọng. STUDY4 áp dụng những công nghệ tối ưu vào học tập như spaced-repetition để ôn tập
//             flashcards, AI để chấm chữa phát âm và bài thi nói/viết. Toàn bộ quá trình luyện thi của bạn sẽ được thống
//             kê chi tiết theo ngày và theo từng dạng câu hỏi để có thể dễ dàng theo dõi tiến độ và điều chỉnh lộ trình ôn
//             tập một cách phù hợp.
//           </p>
//         </div>
//       </section>

//       {/* Consultation Form */}
//       <section className="w-full bg-gray-100 py-12 px-4">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Tư vấn lộ trình học</h2>
//           <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực học (thành phố/tỉnh) *</label>
//                 <input
//                   type="text"
//                   name="region"
//                   value={formData.region}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Môn học bạn quan tâm</label>
//                 <select
//                   name="course"
//                   value={formData.course}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Chọn môn học</option>
//                   <option value="toeic">TOEIC</option>
//                   <option value="ielts">IELTS Academic</option>
//                   <option value="ielts-general">IELTS General</option>
//                   <option value="hsk">HSK</option>
//                 </select>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 mb-6">Bạn có thể học thử miễn phí trước khi đăng ký.</p>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//             >
//               Đăng ký tư vấn miễn phí
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section className="w-full bg-white py-12 px-4">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Danh sách các môn học</h2>

//           {/* Category Tabs */}
//           <div className="mb-8 overflow-x-auto">
//             <div className="flex gap-2 pb-2">
//               {categories.map((cat) => (
//                 <button
//                   key={cat.id}
//                   onClick={() => setSelectedCategory(cat.id)}
//                   className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
//                     selectedCategory === cat.id
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {cat.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Courses Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {getDisplayedCourses().map((course) => (
//               <CourseCard key={course.id} course={course} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full bg-gray-900 text-gray-300 py-12 px-4">
//         <div className="w-full">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h3 className="text-white font-bold mb-4">Về STUDY4</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Tài nguyên</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Chính sách chung</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản và Điều Kiện
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Khác</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách kiểm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách giao, nhận hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 pt-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//               <div>
//                 <h4 className="text-white font-bold mb-3">CÔNG TY TNHH CÔNG NGHỆ A PLUS</h4>
//                 <p className="text-sm mb-2">Hotline: 096 369 5525</p>
//                 <p className="text-sm mb-2">Email: study4.team@gmail.com</p>
//                 <p className="text-sm mb-2">
//                   Địa chỉ: Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//                 <p className="text-sm">ĐKKD: 0109675459</p>
//               </div>
//               <div>
//                 <h4 className="text-white font-bold mb-3">TRUNG TÂM NGOẠI NGỮ STUDY4</h4>
//                 <p className="text-sm">
//                   Số 17, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//               </div>
//             </div>

//             <div className="border-t border-gray-700 pt-6 text-center text-sm">
//               <p className="mb-4">STUDY4.COM © Bản quyền của Công ty TNHH Công Nghệ A Plus.</p>
//               <p className="text-xs text-gray-400">
//                 IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//                 Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//                 Cambridge ESOL, the British Council, and IDP Education Australia.
//               </p>
//               <p className="text-xs text-gray-400 mt-2">
//                 ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//                 not endorsed or approved by ETS.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }


















































































// CHI TIẾT KHOÁ HỌC
// "use client"

// import { useState } from "react"
// import { Menu, X, Star, Users, CheckCircle } from "lucide-react"

// export default function Study4CourseDetail() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const course = {
//     title: "Combo Advanced IELTS Intensive kèm chấm chữa giáo viên bản ngữ [Tặng TED Talks]",
//     tag: "#Phần mềm online",
//     rating: 4.9,
//     reviewsCount: 680, // ĐỔI từ reviews -> reviewsCount (số lượng đánh giá)
//     students: 107333,
//     originalPrice: 5346000,
//     discountedPrice: 2925000,
//     discount: 45,
//     features: [
//       "Dành cho các bạn từ band 4.0 trở lên target 7.0+",
//       "Sở hữu trọn bộ 4 khoá học IELTS Intensive online: Listening - Reading - Writing - Speaking",
//       "Gói 5 bài chấm chữa chi tiết bởi giáo viên, cựu giám khảo bản ngữ Anh, Úc, Mỹ",
//       "Tặng kèm khoá Luyện nghe nói tiếng Anh cùng Ted Talks trị giá 599k",
//       "Combo 5 khoá học có giá trị 12 tháng",
//     ],
//     outcomes: [
//       "Xây dựng vốn từ vựng học thuật 99% sẽ xuất hiện trong 2 phần thi Listening và Reading",
//       "Làm chủ tốc độ và các ngữ điệu khác nhau trong phần thi IELTS Listening",
//       "Nắm chắc chiến thuật và phương pháp làm các dạng câu hỏi trong IELTS Listening và Reading",
//       "Xây dựng ý tưởng viết luận, kỹ năng viết câu, bố cục các đoạn, liên kết ý",
//       "Luyện tập phát âm, từ vựng, ngữ pháp và thực hành luyện nói các chủ đề thường gặp",
//       "Được chấm chữa chi tiết xác định được điểm yếu và cách khắc phục",
//     ],
//     stats: {
//       students: 107333,
//       topics: 102,
//       lessons: 1215,
//       exercises: 2681,
//     },
//     instructors: [
//       {
//         name: "Ms. Phuong Nguyen",
//         credentials: "Macalester College, USA. TOEFL 114, IELTS 8.0, SAT 2280, GRE Verbal 165/170",
//       },
//       {
//         name: "Ms. Uyen Tran",
//         credentials: "FTU. IELTS 8.0 (Listening 8.5, Reading 8.5)",
//       },
//     ],
//     learningMethods: [
//       {
//         title: "Chiến lược làm tất cả các dạng câu hỏi IELTS Reading và Listening",
//         description:
//           "Khóa học IELTS Intensive Listening và Intensive Reading cung cấp video bài giảng hướng dẫn chi tiết cách làm tất cả các dạng câu hỏi, tips làm nhanh & chính xác và chiến lược kiểm soát thời gian hiệu quả.",
//       },
//       {
//         title: "Video chữa đề chi tiết",
//         description:
//           "Khóa học IELTS Intensive cung cấp 400h clip chữa chi tiết toàn bộ các câu hỏi trong các bộ đề thi. Mỗi bài chữa đều bao gồm phương pháp đọc câu hỏi, tìm keywords, cách tìm đáp án đúng.",
//       },
//       {
//         title: "Phương pháp luyện nghe và chép chính tả cực hiệu quả",
//         description:
//           "Khoá học IELTS Intensive Listening - luyện nghe bằng phương pháp Dictation gồm 176 bài nghe format thi thật với 3 chế độ luyện tập: dễ, trung bình và nâng cao.",
//       },
//       {
//         title: "Bộ từ vựng có xác suất 99% sẽ xuất hiện trong phần thi IELTS",
//         description:
//           "STUDY4 đã tổng hợp từ vựng thành khoá học duy nhất gồm flashcards, highlights từ vựng trong bài, và các bài tập thực hành dễ dùng dễ học.",
//       },
//       {
//         title: "Hệ thống bài luyện tập dưới dạng game lý thú",
//         description:
//           "Với mỗi list từ vựng, thay vì phải làm những bài tập khô khan, bạn sẽ chơi hàng loạt trò chơi giúp việc học không nhàm chán.",
//       },
//       {
//         title: "Nắm trọn cách trả lời các dạng câu hỏi Task 1 và Task 2 phần thi IELTS Writing",
//         description:
//           "Bạn sẽ hiểu cấu trúc của phần thi IELTS Writing, học cách viết câu trả lời, tạo dòng chảy trong bài luận, tăng lượng từ vựng.",
//       },
//       {
//         title: "Thực hành luyện tập các chủ đề thường gặp IELTS Speaking",
//         description:
//           "Nắm lòng cách phát âm IPA, hiểu cấu trúc của phần thi IELTS Speaking, học cách trả lời cho các chủ đề part 1, 2, và 3.",
//       },
//       {
//         title: "Chấm chữa chi tiết bài làm IELTS Speaking và Writing bởi giáo viên bản ngữ",
//         description:
//           "Tất cả các bài làm đều được chấm chữa và cho điểm chi tiết bởi đội ngũ giáo viên giàu kinh nghiệm. Nhận điểm từ 1-3 ngày sau khi nộp.",
//       },
//     ],
//     includedCourses: [
//       {
//         id: 1,
//         title:
//           "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
//         rating: 4.9,
//         reviews: 222,
//         students: 30506,
//         description: "Dành cho các bạn band 4.0+ đang target band 7.0+ IELTS Listening",
//       },
//       {
//         id: 2,
//         title: "[IELTS Intensive Reading] Chiến lược làm bài - Chữa đề - Từ vựng IELTS Reading",
//         rating: 4.9,
//         reviews: 136,
//         students: 32536,
//         description: "Dành cho các bạn từ band 4.0 trở lên target 7.0+ IELTS Reading",
//       },
//       {
//         id: 3,
//         title: "[IELTS Intensive Speaking] Thực hành luyện tập IELTS Speaking",
//         rating: 5.0,
//         reviews: 96,
//         students: 17530,
//         description: "Dành cho các bạn từ band 4.0 trở lên đang target band 6.0+ speaking",
//       },
//       {
//         id: 4,
//         title: "[IELTS Intensive Writing] Thực hành luyện tập IELTS Writing",
//         rating: 5.0,
//         reviews: 176,
//         students: 18099,
//         description: "Dành cho các bạn từ band 4.0 trở lên đang target band 6.0+ writing",
//       },
//       {
//         id: 5,
//         title: "[Gói chấm chữa] Advanced IELTS Writing & Speaking (Target 6.5+)",
//         rating: 4.9,
//         reviews: 50,
//         students: 8662,
//         description: "Tất cả bài làm sẽ được chấm chữa bởi đội ngũ giáo viên bản ngữ",
//       },
//     ],
//     // MẢNG đánh giá chi tiết (giữ tên reviews cho đúng nghĩa)
//     reviews: [
//       {
//         author: "Anh Nguyễn",
//         age: 16,
//         location: "CNN, Hà Nội",
//         date: "Tháng 8. 22, 2025",
//         rating: 5,
//         course: "[IELTS Intensive Reading] Chiến lược làm bài - Chữa đề - Từ vựng IELTS Reading",
//         text: "Cám ơn STUDY4 rất rất nhiều!!! Khoá học Intensive vocabulary giúp mình học từ vựng một cách hiệu quả chưa từng thấy. Band reading của mình đã được cải thiện từ 6.5 lên 8.0!",
//       },
//       {
//         author: "abcxyz",
//         date: "Tháng 8. 22, 2025",
//         rating: 5,
//         course:
//           "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
//         text: "trọn bộ Cam quá tuyệt vời",
//       },
//       {
//         author: "Phan T Dũng",
//         date: "Tháng 8. 22, 2025",
//         rating: 5,
//         course:
//           "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
//         text: "Cách luyện tập rất hữu ích và giúp tiết kiệm thời gian",
//       },
//       {
//         author: "TT Trung",
//         date: "Tháng 8. 22, 2025",
//         rating: 5,
//         course:
//           "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
//         text: "có thể thêm phần flashcard học từ vựng highlight thì hay quá ad ạ",
//       },
//     ],
//   }

//   const formatPrice = (price) => {
//     return price.toLocaleString("vi-VN") + "đ"
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="w-full px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">S</div>
//               <span className="font-bold text-lg text-gray-900">STUDY4</span>
//             </div>

//             <nav className="hidden md:flex items-center gap-8">
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Giới thiệu</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Chương trình học</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Đề thi online</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Flashcards</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Blog</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Kích hoạt tài khoản</a>
//             </nav>

//             <div className="flex items-center gap-4">
//               <button className="hidden md:block w-10 h-10 bg-gray-900 rounded-full"></button>
//               <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Course Header */}
//       <section className="w-full bg-white py-8 px-4 border-b border-gray-200">
//         <div className="w-full">
//           <div className="flex items-start justify-between gap-8">
//             <div className="flex-1">
//               <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded mb-4">
//                 {course.tag}
//               </span>
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

//               <div className="flex items-center gap-6 mb-6">
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold text-gray-900">{course.rating}</span>
//                   <span className="text-gray-600">({course.reviewsCount} Đánh giá)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-600">{course.students.toLocaleString("vi-VN")} Học viên</span>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 {course.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <span className="text-gray-700">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="w-full md:w-80 bg-gray-50 p-6 rounded-lg border border-gray-200 flex-shrink-0">
//               <div className="mb-6">
//                 <div className="text-sm text-gray-600 mb-2">Ưu đãi đặc biệt tháng 10/2025:</div>
//                 <div className="flex items-baseline gap-3 mb-2">
//                   <span className="text-3xl font-bold text-gray-900">{formatPrice(course.discountedPrice)}</span>
//                   <span className="text-lg text-gray-500 line-through">{formatPrice(course.originalPrice)}</span>
//                 </div>
//                 <div className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded">
//                   -{course.discount}%
//                 </div>
//               </div>

//               <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mb-4">
//                 ĐĂNG KÝ HỌC NGAY
//               </button>

//               <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//                 Học thử miễn phí
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Learning Outcomes */}
//       <section className="w-full bg-gray-50 py-12 px-4">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Bạn sẽ đạt được gì sau khoá học?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {course.outcomes.map((outcome, idx) => (
//               <div key={idx} className="flex items-start gap-4">
//                 <div className="text-2xl font-bold text-blue-600 flex-shrink-0">⃣</div>
//                 <p className="text-gray-700">{outcome}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Course Stats */}
//       <section className="w-full bg-white py-12 px-4 border-b border-gray-200">
//         <div className="w-full">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div>
//               <div className="text-3xl font-bold text-blue-600 mb-2">
//                 {course.stats.students.toLocaleString("vi-VN")}
//               </div>
//               <p className="text-gray-600">học viên đã đăng ký</p>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-blue-600 mb-2">{course.stats.topics}</div>
//               <p className="text-gray-600">chủ đề</p>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-blue-600 mb-2">
//                 {course.stats.lessons.toLocaleString("vi-VN")}
//               </div>
//               <p className="text-gray-600">bài học</p>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-blue-600 mb-2">
//                 {course.stats.exercises.toLocaleString("vi-VN")}
//               </div>
//               <p className="text-gray-600">bài tập thực hành</p>
//             </div>
//           </div>
//           <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//             <p className="text-gray-700">
//               Combo 5 khoá học có giá trị 12 tháng • Có thể học trên điện thoại và máy tính
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Instructors */}
//       <section className="w-full bg-white py-12 px-4 border-b border-gray-200">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Thông tin khoá học</h2>
//           <div className="mb-8">
//             <h3 className="text-lg font-bold text-gray-900 mb-6">Bài học được biên soạn và giảng dạy bởi:</h3>
//             <div className="space-y-6">
//               {course.instructors.map((instructor, idx) => (
//                 <div key={idx} className="border-l-4 border-blue-600 pl-6">
//                   <h4 className="font-bold text-gray-900 mb-2">{instructor.name}</h4>
//                   <p className="text-gray-700">{instructor.credentials}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Learning Methods */}
//       <section className="w-full bg-gray-50 py-12 px-4">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Bạn sẽ học như thế nào?</h2>
//         </div>
//         <div className="w-full space-y-8">
//           {course.learningMethods.map((method, idx) => (
//             <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
//               <h3 className="text-lg font-bold text-gray-900 mb-3">
//                 {idx + 1}. {method.title}
//               </h3>
//               <p className="text-gray-700 leading-relaxed">{method.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Included Courses */}
//       <section className="w-full bg-white py-12 px-4 border-b border-gray-200">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Chương trình học</h2>
//           <p className="text-gray-700 mb-8">Combo này bao gồm:</p>
//           <div className="space-y-6">
//             {course.includedCourses.map((subCourse, idx) => (
//               <div key={subCourse.id} className="border border-gray-200 rounded-lg p-6">
//                 <div className="flex items-start justify-between gap-4 mb-4">
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-2">
//                       {idx + 1}. {subCourse.title}
//                     </h3>
//                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                       <span className="flex items-center gap-1">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         {subCourse.rating} ({subCourse.reviews} Đánh giá)
//                       </span>
//                       <span>{subCourse.students.toLocaleString("vi-VN")} Học viên</span>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 text-sm">{subCourse.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Reviews */}
//       <section className="w-full bg-gray-50 py-12 px-4">
//         <div className="w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Nhận xét của học viên</h2>

//           <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
//               <div>
//                 <div className="flex gap-1 mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-5 h-5 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-600">{course.reviewsCount} Đánh giá</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {course.reviews.map((review, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h4 className="font-bold text-gray-900">
//                       {review.author}
//                       {review.age && <span className="text-gray-600 font-normal">, {review.age} tuổi</span>}
//                       {review.location && <span className="text-gray-600 font-normal">, {review.location}</span>}
//                     </h4>
//                     <p className="text-sm text-gray-600">{review.date}</p>
//                   </div>
//                   <div className="flex gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Đánh giá khoá học: <span className="font-medium">{review.course}</span>
//                 </p>
//                 <p className="text-gray-700">{review.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full bg-gray-900 text-gray-300 py-12 px-4">
//         <div className="w-full">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h3 className="text-white font-bold mb-4">Về STUDY4</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
//                 <li><a href="#" className="hover:text-white">Thư viện đề thi</a></li>
//                 <li><a href="#" className="hover:text-white">Hướng dẫn sử dụng</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Tài nguyên</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-white">Liên hệ</a></li>
//                 <li><a href="#" className="hover:text-white">Blog</a></li>
//                 <li><a href="#" className="hover:text-white">Hướng dẫn thanh toán</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Chính sách chung</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-white">Điều khoản bảo mật</a></li>
//                 <li><a href="#" className="hover:text-white">Tổng hợp tài liệu</a></li>
//                 <li><a href="#" className="hover:text-white">Điều khoản và Điều Kiện</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Khác</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-white">Chính sách kiểm hàng</a></li>
//                 <li><a href="#" className="hover:text-white">Chính sách giao, nhận hàng</a></li>
//                 <li><a href="#" className="hover:text-white">Phản hồi, khiếu nại</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 pt-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//               <div>
//                 <h4 className="text-white font-bold mb-3">CÔNG TY TNHH CÔNG NGHỆ A PLUS</h4>
//                 <p className="text-sm mb-2">Hotline: 096 369 5525</p>
//                 <p className="text-sm mb-2">Email: study4.team@gmail.com</p>
//                 <p className="text-sm mb-2">
//                   Địa chỉ: Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//                 <p className="text-sm">ĐKKD: 0109675459</p>
//               </div>
//               <div>
//                 <h4 className="text-white font-bold mb-3">TRUNG TÂM NGOẠI NGỮ STUDY4</h4>
//                 <p className="text-sm">
//                   Số 17, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//               </div>
//             </div>

//             <div className="border-t border-gray-700 pt-6 text-center text-sm">
//               <p className="mb-4">STUDY4.COM © Bản quyền của Công ty TNHH Công Nghệ A Plus.</p>
//               <p className="text-xs text-gray-400">
//                 IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//                 Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//                 Cambridge ESOL, the British Council, and IDP Education Australia.
//               </p>
//               <p className="text-xs text-gray-400 mt-2">
//                 ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//                 not endorsed or approved by ETS.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

















































































































// LEARNING

// "use client"

// import { useState } from "react"
// import { Play, Star } from "lucide-react"

// export default function Study4Learning() {
//   const [expandedSection, setExpandedSection] = useState(0)
//   const [currentLesson, setCurrentLesson] = useState(0)

//   const lessons = [
//     { id: 1, title: "Lesson 01: Introduction about XD", duration: "30 mins", type: "video" },
//     { id: 2, title: "Lesson 02: Getting Started", duration: "30 mins", type: "video" },
//     { id: 3, title: "Lesson 03: Basic Concepts", duration: "30 mins", type: "video" },
//     { id: 4, title: "Practice Quiz", duration: "15 mins", type: "quiz" },
//     { id: 5, title: "Lesson 04: Advanced Topics", duration: "30 mins", type: "video" },
//     { id: 6, title: "Lesson 05: Real World Examples", duration: "30 mins", type: "video" },
//     { id: 7, title: "Lesson 06: Best Practices", duration: "30 mins", type: "video" },
//     { id: 8, title: "Lesson 07: Troubleshooting", duration: "30 mins", type: "video" },
//     { id: 9, title: "Lesson 08: Final Project", duration: "1 hour", type: "video" },
//     { id: 10, title: "Practice Quiz", duration: "20 mins", type: "quiz" },
//   ]

//   const reviews = [
//     {
//       name: "Bulkin Simons",
//       rating: 5,
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       name: "Lina",
//       rating: 5,
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       name: "John Doe",
//       rating: 4,
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//   ]

//   const relatedCourses = [
//     {
//       id: 1,
//       title: "Design Fundamentals",
//       duration: "3 Month",
//       category: "Design",
//       instructor: "Lina",
//       price: 100,
//       discount: 80,
//     },
//     {
//       id: 2,
//       title: "AWS Certified Solutions Architect",
//       duration: "3 Month",
//       category: "AWS",
//       instructor: "Lina",
//       price: 100,
//       discount: 80,
//     },
//     {
//       id: 3,
//       title: "Advanced Design Patterns",
//       duration: "3 Month",
//       category: "Design",
//       instructor: "Lina",
//       price: 100,
//       discount: 80,
//     },
//     {
//       id: 4,
//       title: "Cloud Computing Basics",
//       duration: "3 Month",
//       category: "AWS",
//       instructor: "Lina",
//       price: 100,
//       discount: 80,
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="w-full px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold">S</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">STUDY4</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-8">
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Giới thiệu
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Chương trình học
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Đề thi online
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Flashcards
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Blog
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Kích hoạt tài khoản
//             </a>
//           </nav>
//           <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="w-full flex">
//         {/* Sidebar */}
//         <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto max-h-[calc(100vh-80px)]">
//           <div className="p-6">
//             <h2 className="text-lg font-bold text-gray-900 mb-4">Learn about Adobe XD & Prototyping</h2>
//             <p className="text-sm text-gray-600 mb-6">Change Simplification</p>

//             <div className="space-y-2">
//               {lessons.map((lesson, index) => (
//                 <button
//                   key={lesson.id}
//                   onClick={() => setCurrentLesson(index)}
//                   className={`w-full text-left p-3 rounded-lg transition-colors ${
//                     currentLesson === index ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-start gap-2">
//                     <Play size={16} className="mt-1 flex-shrink-0" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{lesson.title}</p>
//                       <p className="text-xs text-gray-500">{lesson.duration}</p>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)]">
//           {/* Video Player */}
//           <div className="w-full bg-black aspect-video flex items-center justify-center">
//             <div className="text-center">
//               <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Play size={40} className="text-white fill-white" />
//               </div>
//               <p className="text-white text-sm">0:05 / 03:26</p>
//             </div>
//           </div>

//           {/* Lesson Info */}
//           <div className="p-8 border-b border-gray-200">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson 01: Introduction about XD</h1>
//                 <p className="text-gray-600">30 mins</p>
//               </div>
//               <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
//                 O6 Super Coins on the way
//               </div>
//             </div>
//             <p className="text-gray-700 leading-relaxed">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//               dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
//               ea commodo consequat.
//             </p>
//           </div>

//           {/* Course Info Sections */}
//           <div className="p-8 space-y-8">
//             {/* Who this course is for */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Who this course is for?</h2>
//               <p className="text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//                 dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
//                 ex ea commodo consequat.
//               </p>
//             </div>

//             {/* Achievable */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Achievable</h2>
//               <p className="text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//                 dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
//                 ex ea commodo consequat.
//               </p>
//             </div>

//             {/* Instructor */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Instructor</h2>
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <p className="font-bold text-gray-900">Bulkin Simons</p>
//                   <p className="text-sm text-gray-600">Professional Instructor</p>
//                 </div>
//               </div>
//             </div>

//             {/* Reviews */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Student Reviews</h2>
//               <div className="space-y-4">
//                 {reviews.map((review, index) => (
//                   <div key={index} className="border border-gray-200 rounded-lg p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <p className="font-bold text-gray-900">{review.name}</p>
//                       <div className="flex gap-1">
//                         {[...Array(review.rating)].map((_, i) => (
//                           <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
//                         ))}
//                       </div>
//                     </div>
//                     <p className="text-gray-700 text-sm">{review.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Related Courses */}
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-gray-900">Student also bought</h2>
//                 <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                   See all
//                 </a>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {relatedCourses.map((course) => (
//                   <div
//                     key={course.id}
//                     className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//                   >
//                     <div className="w-full h-40 bg-gray-300"></div>
//                     <div className="p-4">
//                       <p className="text-xs text-gray-500 mb-1">{course.category}</p>
//                       <p className="font-bold text-gray-900 text-sm mb-2">{course.title}</p>
//                       <p className="text-xs text-gray-600 mb-3">{course.duration}</p>
//                       <p className="text-xs text-gray-600 mb-3">By {course.instructor}</p>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-bold text-gray-900">${course.discount}</span>
//                         <span className="text-sm text-gray-500 line-through">${course.price}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 w-full">
//         <div className="w-full px-8 py-12">
//           <div className="grid grid-cols-4 gap-8 mb-8">
//             <div>
//               <h3 className="text-white font-bold mb-4">Về STUDY4</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Tài nguyên</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Chính sách chung</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản sử dụng
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Khác</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách kiếm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách giao, nhận hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 pt-8">
//             <div className="grid grid-cols-2 gap-8 mb-8">
//               <div>
//                 <h4 className="text-white font-bold mb-2">CÔNG TY TNHH CÔNG NGHỆ A PLUS</h4>
//                 <p className="text-sm mb-2">Hotline: 096 369 5525</p>
//                 <p className="text-sm mb-2">Email: study4.team@gmail.com</p>
//                 <p className="text-sm mb-2">
//                   Địa chỉ: Số 15, Ngõ 208 Giải Phóng, Phương Phương Liễt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//                 <p className="text-sm">ĐKKD: 0109675459</p>
//               </div>
//               <div>
//                 <h4 className="text-white font-bold mb-2">TRUNG TÂM NGOÀI NGỮ STUDY4</h4>
//                 <p className="text-sm">
//                   Số 17, Ngõ 208 Giải Phóng, Phương Phương Liễt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//                 </p>
//                 <p className="text-sm mt-2">Quyết định cho phép hoạt động số 2654/QĐ-SGDĐT</p>
//               </div>
//             </div>
//             <div className="text-center text-sm border-t border-gray-700 pt-8">
//               <p className="mb-4">STUDY4.COM © Bản quyền của Công ty TNHH Công Nghệ A Plus.</p>
//               <p className="text-xs">
//                 IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//                 Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//                 Cambridge ESOL, the British Council, and IDP Education Australia.
//               </p>
//               <p className="text-xs mt-2">
//                 ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//                 not endorsed or approved by ETS.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



























































// "use client"

// import { useState, useEffect } from "react"

// export default function IELTSListeningTest() {
//   const [answers, setAnswers] = useState({})
//   const [timeLeft, setTimeLeft] = useState(39 * 60 + 37) // 39:37
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [currentRecording, setCurrentRecording] = useState(1)
//   const [submitted, setSubmitted] = useState(false)
//   const [highlightEnabled, setHighlightEnabled] = useState(false)

//   // Timer
//   useEffect(() => {
//     if (!isPlaying) return
//     const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
//     return () => clearInterval(timer)
//   }, [isPlaying])

//   const formatTime = (s) => {
//     const m = Math.floor(s / 60)
//     const sec = s % 60
//     return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
//   }

//   const handleAnswerChange = (q, v) => setAnswers((prev) => ({ ...prev, [q]: v }))

//   const handleSubmit = () => {
//     if (window.confirm("Bạn có chắc chắn muốn nộp bài?")) {
//       setSubmitted(true)
//       alert("Bài làm đã được nộp!")
//     }
//   }

//   const questions = [
//     { num: 1, label: "First Name" },
//     { num: 2, label: "Country of Origin" },
//     { num: 3, label: "Date of Arrival" },
//     { num: 4, label: "Number of Tenants" },
//     { num: 5, label: "Purpose of Visit" },
//     { num: 6, label: "Type of Accommodation" },
//     { num: 7, label: "Car Parking" },
//     { num: 8, label: "Other Requirements" },
//     { num: 9, label: "Name of Town" },
//   ]

//   const recordings = [
//     { id: 1, label: "Recording 1" },
//     { id: 2, label: "Recording 2" },
//     { id: 3, label: "Recording 3" },
//     { id: 4, label: "Recording 4" },
//   ]

//   const recordingQuestions = {
//     1: Array.from({ length: 10 }, (_, i) => i + 1),
//     2: Array.from({ length: 10 }, (_, i) => i + 11),
//     3: Array.from({ length: 10 }, (_, i) => i + 21),
//     4: Array.from({ length: 10 }, (_, i) => i + 31),
//   }

//   /** =========================
//    *  LƯU Ý FULL-WIDTH:
//    *  - Root: w-screen max-w-none -> bỏ mọi giới hạn width
//    *  - Main: grid 2 cột [1fr, 340px] -> full chiều ngang
//    *  - Header cao ~64px => dùng top-[64px] cho sticky
//    *  - Left: h-[calc(100vh-64px)] overflow-y-auto
//    *  - Right: sticky + own overflow-y-auto
//    * ========================= */

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-gray-100 overflow-hidden">
//       {/* Header (64px) */}
//       <div className="bg-white border-b border-gray-200 px-6 h-16 flex justify-between items-center sticky top-0 z-20">
//         <div className="flex items-center gap-3">
//           <div className="text-2xl font-bold text-blue-600">STUDY4</div>
//         </div>
//         <h1 className="text-base md:text-xl font-bold text-gray-800 text-center">
//           IELTS Simulation Listening test 1
//         </h1>
//         <button className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
//       </div>

//       {/* Main: full width grid */}
//       <main className="w-screen grid grid-cols-[1fr_340px]">
//         {/* Left content (scrollable area) */}
//         <section className="h-[calc(100vh-64px)] overflow-y-auto px-6 md:px-8 py-6">
//           {/* Toggle highlight */}
//           <div className="flex items-center gap-2 mb-6">
//             <input
//               type="checkbox"
//               id="highlight"
//               checked={highlightEnabled}
//               onChange={(e) => setHighlightEnabled(e.target.checked)}
//               className="w-5 h-5 cursor-pointer"
//             />
//             <label htmlFor="highlight" className="text-gray-700 font-medium cursor-pointer">
//               Highlight nội dung
//             </label>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
//             {recordings.map((rec) => (
//               <button
//                 key={rec.id}
//                 onClick={() => setCurrentRecording(rec.id)}
//                 className={`px-4 py-3 font-medium transition whitespace-nowrap ${
//                   currentRecording === rec.id
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600 hover:text-gray-800"
//                 }`}
//               >
//                 {rec.label}
//               </button>
//             ))}
//           </div>

//           {/* Audio */}
//           <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setIsPlaying(!isPlaying)}
//                 className="text-gray-600 hover:text-gray-800 text-2xl flex-shrink-0"
//               >
//                 {isPlaying ? "⏸" : "▶"}
//               </button>
//               <div className="flex-1 bg-gray-200 h-1 rounded-full" />
//               <span className="text-sm text-gray-600 flex-shrink-0">00:00</span>
//               <button className="text-gray-600 hover:text-gray-800 flex-shrink-0">🔊</button>
//               <button className="text-gray-600 hover:text-gray-800 flex-shrink-0">⚙</button>
//             </div>
//           </div>

//           {/* Instructions */}
//           <div className="mb-6">
//             <p className="text-gray-700 font-semibold mb-2">Complete the form below.</p>
//             <p className="text-gray-600 text-sm">
//               Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.
//             </p>
//           </div>

//           {/* Form */}
//           <div className="bg-white rounded-lg p-6 shadow-sm">
//             <h2 className="text-lg font-bold text-gray-800 mb-6">SHORT STAY ACCOMMODATION</h2>

//             <div className="mb-6 pb-6 border-b border-gray-200 space-y-2">
//               <p className="text-gray-700"><span className="font-semibold">Family Name:</span> Mackinlay</p>
//               <p className="text-gray-700"><span className="font-semibold">First Name:</span> ___1___</p>
//               <p className="text-gray-700"><span className="font-semibold">Country of Origin:</span> ___2___</p>
//               <p className="text-gray-700"><span className="font-semibold">Date of Arrival:</span> ___3___</p>
//               <p className="text-gray-700"><span className="font-semibold">Number of Tenants:</span> ___4___</p>
//               <p className="text-gray-700"><span className="font-semibold">Length of Stay:</span> 2 weeks</p>
//               <p className="text-gray-700"><span className="font-semibold">Purpose of Visit:</span> ___5___</p>
//               <p className="text-gray-700"><span className="font-semibold">Type of Accommodation:</span> ___6___</p>
//               <p className="text-gray-700"><span className="font-semibold">Number of Bedrooms:</span> one or two</p>
//               <p className="text-gray-700"><span className="font-semibold">Car Parking:</span> off-street and ___7___</p>
//               <p className="text-gray-700"><span className="font-semibold">General Area:</span> near the beach</p>
//               <p className="text-gray-700"><span className="font-semibold">Other Requirements:</span> near ___8___</p>
//               <p className="text-gray-700"><span className="font-semibold">Name of Town:</span> ___9___</p>
//               <p className="text-gray-700"><span className="font-semibold">Client's Email:</span> smac13@hotmail.com</p>
//               <p className="text-gray-700"><span className="font-semibold">Price Range:</span> up to $___10___ a week</p>
//             </div>

//             {/* Inputs (thêm id để sidebar scroll đến) */}
//             <div className="space-y-4">
//               {questions.map((q) => (
//                 <div key={q.num} className="flex items-center gap-4">
//                   <span className="text-blue-600 font-bold w-8 flex-shrink-0">{q.num}</span>
//                   <input
//                     id={`q-${q.num}`}
//                     type="text"
//                     value={answers[q.num] || ""}
//                     onChange={(e) => handleAnswerChange(q.num, e.target.value)}
//                     className="flex-1 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-2 bg-transparent"
//                     disabled={submitted}
//                     placeholder=""
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Next */}
//           <div className="mt-6 text-right">
//             <button className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
//               TIẾP THEO <span>›</span>
//             </button>
//           </div>
//         </section>

//         {/* Right sidebar */}
//         <aside className="bg-gray-50 border-l border-gray-200">
//           {/* Sticky box theo header 64px */}
//           <div className="sticky top-16">
//             {/* Nội dung sidebar tự cuộn, chiều cao khớp viewport trừ header */}
//             <div className="bg-white p-6 shadow-sm h-[calc(100vh-64px)] overflow-y-auto">
//               {/* Timer */}
//               <div className="mb-8">
//                 <p className="text-gray-600 text-sm mb-2">Thời gian còn lại:</p>
//                 <p className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</p>
//               </div>

//               {/* Submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={submitted}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mb-6 transition disabled:opacity-50"
//               >
//                 NỘP BÀI
//               </button>

//               {/* Note */}
//               <div className="mb-6 pb-6 border-b border-gray-200">
//                 <p className="text-red-600 text-sm font-semibold mb-2">Khôi phục/lưu bài làm</p>
//                 <p className="text-gray-600 text-xs">Chọn ô để chọn câu hỏi số thứ tự để dễ dàng điều hướng</p>
//               </div>

//               {/* Grids */}
//               <div className="space-y-6">
//                 {recordings.map((rec) => (
//                   <div key={rec.id}>
//                     <p className="font-semibold text-gray-800 mb-3 text-sm">{rec.label}</p>
//                     <div className="grid grid-cols-5 gap-2">
//                       {recordingQuestions[rec.id].map((qNum) => (
//                         <button
//                           key={qNum}
//                           onClick={() => {
//                             setCurrentRecording(rec.id)
//                             const el = document.getElementById(`q-${qNum}`)
//                             el?.scrollIntoView({ behavior: "smooth", block: "center" })
//                             el?.focus()
//                           }}
//                           className={`w-10 h-10 rounded text-sm font-semibold transition ${
//                             answers[qNum]
//                               ? "bg-blue-600 text-white"
//                               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                           }`}
//                         >
//                           {qNum}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>
//       </main>
//     </div>
//   )
// }







































































// "use client"

// import { useState } from "react"

// export default function IELTSResultsPage() {
//   const [activeTab, setActiveTab] = useState("overview")
//   const [expandedAnswer, setExpandedAnswer] = useState(null)

//   // Mock data
//   const results = {
//     testName: "IELTS Simulation Listening test 1",
//     totalCorrect: 0,
//     totalWrong: 40,
//     totalSkipped: 0,
//     totalQuestions: 40,
//     score: 0.0,
//     accuracy: 0.0,
//     completionTime: "0:01:56",
//   }

//   const recordings = [
//     { id: 1, name: "Recording 1" },
//     { id: 2, name: "Recording 2" },
//     { id: 3, name: "Recording 3" },
//     { id: 4, name: "Recording 4" },
//   ]

//   const questionCategories = [
//     { name: "[Listening] Note/Form Completion", correct: 0, wrong: 10, skipped: 0, accuracy: "0.00%" },
//   ]

//   const answers = [
//     {
//       recording: 1,
//       questions: [
//         { num: 1, answer: "SYLVIA", userAnswer: "aaa", correct: false },
//         { num: 2, answer: "ENGLAND", userAnswer: "aa", correct: false },
//         { num: 3, answer: "26TH (OF) JULY [OR] JULY 26(TH) [OR] 26 JULY", userAnswer: "ấd", correct: false },
//         { num: 4, answer: "TWO/2", userAnswer: "sdasd", correct: false },
//         { num: 5, answer: "(ON) HOLIDAY", userAnswer: "ádas", correct: false },
//         { num: 6, answer: "APARTMENT", userAnswer: "đá", correct: false },
//         { num: 7, answer: "SECURE", userAnswer: "áđá", correct: false },
//         { num: 8, answer: "(THE) MOTORWAY [OR] (THE) M1/MOTORWAY ACCESS", userAnswer: "ádasdas", correct: false },
//         { num: 9, answer: "PALM BEACH", userAnswer: "ádasdas", correct: false },
//         { num: 10, answer: "1500", userAnswer: "đâsdas", correct: false },
//       ],
//     },
//     {
//       recording: 2,
//       questions: [
//         { num: 11, answer: "B", userAnswer: "A", correct: false },
//         { num: 12, answer: "A", userAnswer: "B", correct: false },
//         { num: 13, answer: "A", userAnswer: "B", correct: false },
//         { num: 14, answer: "C", userAnswer: "A", correct: false },
//         { num: 15, answer: "TRAMPING", userAnswer: "ádasdasdasd", correct: false },
//         { num: 16, answer: "WALKING/WALKS", userAnswer: "ádasdasdas", correct: false },
//         { num: 17, answer: "ORGANIZER/ORGANISER", userAnswer: "đâsdasd", correct: false },
//         { num: 18, answer: "VARIABLE", userAnswer: "ádasdas", correct: false },
//         { num: 19, answer: "MYSTERY", userAnswer: "đâsdasd", correct: false },
//         { num: 20, answer: "CHAIRMAN", userAnswer: "ádasdas", correct: false },
//       ],
//     },
//   ]

//   const comments = [
//     { author: "HiPhan0102568aa481428d_28352", date: "Tháng 10. 17, 2025", text: "Trong lúc làm bài mình cảm giác rất căng thẳng vì sợ bản thân sai..." },
//     { author: "bthuong2003", date: "Tháng 10. 16, 2025", text: "Mình đang đi làm, muốn tìm speaking partner vào buổi tối..." },
//   ]

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-gray-100 overflow-hidden">
//       {/* Header sticky (64px) */}
//       <div className="bg-white border-b border-gray-200 px-6 h-16 flex justify-between items-center sticky top-0 z-20">
//         <div className="text-2xl font-bold text-blue-600">STUDY4</div>
//         <h1 className="text-base md:text-xl font-bold text-gray-800 text-center">
//           Kết quả thi: {results.testName}
//         </h1>
//         <button className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
//       </div>

//       {/* Main: full width grid (content | comments) */}
//       <main className="w-screen grid grid-cols-1 lg:grid-cols-[1fr_360px]">
//         {/* LEFT: content (scrollable) */}
//         <section className="h-[calc(100vh-64px)] overflow-y-auto px-6 md:px-8 py-6">
//           {/* Actions */}
//           <div className="flex gap-4 mb-6">
//             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
//               Xem đáp án
//             </button>
//             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
//               Quay về trang đề thi
//             </button>
//           </div>

//           {/* Summary */}
//           <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
//             <h2 className="text-lg font-bold text-gray-800 mb-6">Kết quả làm bài</h2>

//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-blue-600">
//                   {results.totalCorrect}/{results.totalQuestions}
//                 </p>
//                 <p className="text-gray-600 text-sm mt-2">Trả lời đúng</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-red-600">{results.totalWrong}</p>
//                 <p className="text-gray-600 text-sm mt-2">Trả lời sai</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-gray-600">{results.totalSkipped}</p>
//                 <p className="text-gray-600 text-sm mt-2">Bỏ qua</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-gray-800">{results.score.toFixed(1)}</p>
//                 <p className="text-gray-600 text-sm mt-2">Điểm</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-gray-800">{results.accuracy.toFixed(1)}%</p>
//                 <p className="text-gray-600 text-sm mt-2">Độ chính xác</p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-8 text-center">
//               <div>
//                 <p className="text-gray-600 text-sm">Từ điển</p>
//                 <p className="text-lg font-semibold text-gray-800">-</p>
//               </div>
//               <div>
//                 <p className="text-gray-600 text-sm">Thời gian hoàn thành</p>
//                 <p className="text-lg font-semibold text-gray-800">{results.completionTime}</p>
//               </div>
//             </div>
//           </div>

//           {/* Tabs + Content */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 overflow-x-auto">
//               {[
//                 { id: "overview", label: "Tổng quát" },
//                 { id: "recording1", label: "Recording 1" },
//                 { id: "recording2", label: "Recording 2" },
//                 { id: "recording3", label: "Recording 3" },
//                 { id: "recording4", label: "Recording 4" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-6 py-4 font-medium transition whitespace-nowrap ${
//                     activeTab === tab.id
//                       ? "text-blue-600 border-b-2 border-blue-600"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="p-6">
//               {activeTab === "overview" && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">Phân loại câu hỏi</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead>
//                         <tr className="border-b border-gray-200">
//                           <th className="text-left py-3 px-4 font-semibold text-gray-700">Danh sách câu hỏi</th>
//                           <th className="text-center py-3 px-4 font-semibold text-gray-700">Số câu đúng</th>
//                           <th className="text-center py-3 px-4 font-semibold text-gray-700">Số câu sai</th>
//                           <th className="text-center py-3 px-4 font-semibold text-gray-700">Số câu bỏ qua</th>
//                           <th className="text-center py-3 px-4 font-semibold text-gray-700">Độ chính xác</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {questionCategories.map((cat, idx) => (
//                           <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
//                             <td className="py-3 px-4 text-gray-700">{cat.name}</td>
//                             <td className="text-center py-3 px-4 text-gray-700">{cat.correct}</td>
//                             <td className="text-center py-3 px-4 text-gray-700">{cat.wrong}</td>
//                             <td className="text-center py-3 px-4 text-gray-700">{cat.skipped}</td>
//                             <td className="text-center py-3 px-4 text-gray-700">{cat.accuracy}</td>
//                           </tr>
//                         ))}
//                         <tr className="bg-gray-50 font-semibold">
//                           <td className="py-3 px-4 text-gray-800">Total</td>
//                           <td className="text-center py-3 px-4 text-gray-800">{results.totalCorrect}</td>
//                           <td className="text-center py-3 px-4 text-gray-800">{results.totalWrong}</td>
//                           <td className="text-center py-3 px-4 text-gray-800">{results.totalSkipped}</td>
//                           <td className="text-center py-3 px-4 text-gray-800">{results.accuracy.toFixed(2)}%</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Question Numbers (ví dụ) */}
//                   <div className="mt-6">
//                     <h4 className="font-semibold text-gray-800 mb-3">Danh sách câu hỏi</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//                         <button
//                           key={num}
//                           className="w-10 h-10 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold transition"
//                         >
//                           {num}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {(activeTab === "recording1" || activeTab === "recording2") && (
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">Đáp án</h3>
//                   <div className="space-y-4">
//                     {answers
//                       .find((r) => r.recording === (activeTab === "recording1" ? 1 : 2))
//                       ?.questions.map((q) => (
//                         <div key={q.num} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
//                           <div
//                             className="flex justify-between items-start cursor-pointer"
//                             onClick={() => setExpandedAnswer(expandedAnswer === q.num ? null : q.num)}
//                           >
//                             <div className="flex-1">
//                               <p className="font-semibold text-gray-800">
//                                 {q.num}. {q.answer}
//                               </p>
//                               <p className="text-sm text-gray-600 mt-1">
//                                 Câu trả lời của bạn:{" "}
//                                 <span className={q.correct ? "text-green-600" : "text-red-600"}>
//                                   {q.userAnswer}
//                                 </span>
//                               </p>
//                             </div>
//                             <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">[Chi tiết]</button>
//                           </div>
//                           {expandedAnswer === q.num && (
//                             <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
//                               <p>Giải thích chi tiết sẽ hiển thị ở đây...</p>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}

//               {(activeTab === "recording3" || activeTab === "recording4") && (
//                 <div className="text-center py-8 text-gray-600">
//                   <p>Dữ liệu cho {activeTab === "recording3" ? "Recording 3" : "Recording 4"} sẽ hiển thị ở đây</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Footer Navigation */}
//           <div className="mt-6 text-right">
//             <button className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
//               TIẾP THEO <span>›</span>
//             </button>
//           </div>
//         </section>

//         {/* RIGHT: Comments sidebar (sticky, scrollable) */}
//         <aside className="bg-gray-50 border-l border-gray-200 hidden lg:block">
//           <div className="sticky top-16">
//             <div className="bg-white p-6 shadow-sm h-[calc(100vh-64px)] overflow-y-auto">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Bình luận</h3>

//               {/* Comment Input */}
//               <div className="mb-6 pb-6 border-b border-gray-200">
//                 <textarea
//                   placeholder="Chia sẻ cảm nghĩ của bạn ..."
//                   className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 resize-none"
//                   rows={3}
//                 />
//                 <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
//                   Gửi
//                 </button>
//               </div>

//               {/* Comments List */}
//               <div className="space-y-4">
//                 {comments.map((comment, idx) => (
//                   <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
//                       <div className="flex-1">
//                         <p className="font-semibold text-gray-800">{comment.author}</p>
//                         <p className="text-sm text-gray-600">{comment.date}</p>
//                         <p className="text-gray-700 mt-2">{comment.text}</p>
//                         <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">Trả lời</button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">Xem thêm</button>
//             </div>
//           </div>
//         </aside>
//       </main>
//     </div>
//   )
// }












































// BLOG

// "use client"

// import { Search } from "lucide-react"

// export default function BlogPage() {
//   const categories = [
//     { title: "Tìm hiểu về STUDY4", items: ["Tính năng trên STUDY4", "Khóa học trên STUDY4", "The Reading Hub"] },
//     {
//       title: "Luyện thi IELTS",
//       items: [
//         "IELTS Listening",
//         "IELTS Reading",
//         "IELTS Speaking",
//         "IELTS Writing",
//         "IELTS Materials",
//         "Thông tin kỳ thi IELTS",
//         "Kinh nghiệm thi IELTS",
//         "The Reading Hub",
//       ],
//     },
//     {
//       title: "Luyện thi TOEIC",
//       items: ["TOEIC Listening", "TOEIC Reading", "TOEIC Materials", "Thông tin kỳ thi TOEIC", "Kinh nghiệm thi TOEIC"],
//     },
//     {
//       title: "Tiếng Anh cơ bản",
//       items: ["Phát âm", "Từ vựng", "Ngữ pháp"],
//     },
//     {
//       title: "Luyện Thi HSK-HSKK",
//       items: ["Tiếng Trung cơ bản", "Kiến thức HSK-HSKK", "Thông tin kỳ thi HSK-HSKK", "Kinh nghiệm thi HSK-HSKK"],
//     },
//     {
//       title: "Tiếng Anh cho người đi làm",
//       items: ["Du học", "Admission essays", "Kinh nghiệm du học"],
//     },
//   ]

//   const articles = [
//     {
//       category: "IELTS SPEAKING",
//       title: "Bộ đề dự đoán IELTS Speaking Forecast Quý 3/2025 & Bài mẫu (Đang cập nhật)",
//       description:
//         "Trong bài viết này, STUDY4 đã tổng hợp các topic IELTS Speaking có khả năng xuất hiện trong Bộ đề IELTS Speaking Forecast Quý 3/2025 (tháng 9 đến tháng 12).",
//       date: "10/09/2025",
//       author: "Thư",
//       featured: true,
//     },
//     {
//       category: "KINH NGHIỆM THI TOEIC",
//       title: "Lộ trình học TOEIC 2 kỹ năng tại nhà đạt 450-650+ cho người mới bắt đầu của STUDY4",
//       description:
//         "Bạn đang loay hoay muốn tìm lộ trình luyện TOEIC online đạt 450 - 650+? Đọc bài viết của STUDY4 dưới đây để tìm ra câu trả lời!",
//       date: "21/05/2024",
//       author: "Bùi Hằng",
//     },
//     {
//       category: "KINH NGHIỆM THI IELTS",
//       title: "Lộ trình tự học IELTS online tại nhà từ số 0 đến 7+ của STUDY4",
//       description:
//         "Hãy cùng STUDY4 tham khảo ngay lộ trình tự học IELTS từ sơ cấp đến 7.0 chi tiết nhất ở bài viết dưới đây!",
//       date: "21/05/2024",
//       author: "Bùi Hằng",
//     },
//     {
//       category: "IELTS SPEAKING",
//       title: "Describe a time when the electricity suddenly went off - Bài mẫu IELTS Speaking",
//       description:
//         'Hãy tham khảo bài mẫu 8.0+ chủ đề "Describe a time when the electricity suddenly went off" cho IELTS Speaking Part 2 và 3 nhé!',
//       date: "15/10/2025",
//       author: "Thư",
//     },
//     {
//       category: "IELTS SPEAKING",
//       title: "Describe an interesting traditional story - Bài mẫu IELTS Speaking",
//       description:
//         'Hãy tham khảo bài mẫu 8.0+ chủ đề "Describe an interesting traditional story" cho IELTS Speaking Part 2 và 3 nhé!',
//       date: "15/10/2025",
//       author: "Thư",
//     },
//     {
//       category: "IELTS SPEAKING",
//       title: "Describe a long journey you had - Bài mẫu IELTS Speaking",
//       description:
//         'Hãy tham khảo bài mẫu 8.0+ chủ đề "Describe a long journey you had" cho IELTS Speaking Part 2 và 3 nhé!',
//       date: "15/10/2025",
//       author: "Thư",
//     },
//     {
//       category: "IELTS SPEAKING",
//       title: "Describe a great dinner you and your friends or family members enjoyed - Bài mẫu IELTS Speaking",
//       description:
//         'Hãy tham khảo bài mẫu 8.0+ chủ đề "Describe a great dinner you and your friends or family members enjoyed" cho IELTS Speaking Part 2 và 3 nhé!',
//       date: "15/10/2025",
//       author: "Thư",
//     },
//     {
//       category: "KINH NGHIỆM THI TOEIC",
//       title: "Lộ trình tự học TOEIC Speaking & Writing 240+ hiệu quả nhất cùng STUDY4",
//       description:
//         "Trong bài viết này, STUDY4 sẽ hướng dẫn bạn lộ trình học được thiết kế riêng cho người bận rộn của STUDY4, để bạn hoàn toàn có thể tự học tại nhà và đạt 240+ điểm TOEIC Speaking & Writing.",
//       date: "07/10/2025",
//       author: "Thư",
//     },
//   ]

//   const rightSidebarItems = [
//     {
//       type: "courses",
//       title: "KHÓA HỌC IELTS INTENSIVE LISTENING",
//       description: "Khóa học IELTS Intensive Listening",
//     },
//     {
//       type: "courses",
//       title: "KHÓA HỌC IELTS INTENSIVE READING (ACADEMIC)",
//       description: "Khóa học IELTS Intensive Reading",
//     },
//     {
//       type: "courses",
//       title: "KHÓA HỌC IELTS INTENSIVE SPEAKING",
//       description: "Khóa học IELTS Intensive Speaking",
//     },
//     {
//       type: "courses",
//       title: "KHÓA HỌC IELTS INTENSIVE WRITING (ACADEMIC)",
//       description: "Khóa học IELTS Intensive Writing",
//     },
//     {
//       type: "courses",
//       title: "KHÓA HỌC IELTS GENERAL READING",
//       description: "Khóa học IELTS General Reading",
//     },
//     {
//       type: "courses",
//       title: "KHÓA HỌC IELTS GENERAL WRITING",
//       description: "Khóa học IELTS General Writing",
//     },
//   ]

//   return (
//     <div className="w-full bg-white">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
//         <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="bg-blue-600 text-white rounded px-2 py-1 font-bold text-sm">S</div>
//               <span className="font-bold text-lg">STUDY4</span>
//             </div>
//             <nav className="hidden md:flex items-center gap-8 text-sm">
//               <a href="#" className="text-gray-700 hover:text-blue-600">
//                 Khóa học của tôi
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">
//                 Chương trình học
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">
//                 Đề thi online
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">
//                 Flashcards
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">
//                 Blog
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">
//                 Kích hoạt tài khoản
//               </a>
//             </nav>
//             <button className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800">
//               Đăng nhập
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex gap-1 mb-4 text-sm">
//           <a href="#" className="text-blue-600">
//             Trang chủ
//           </a>
//           <span className="text-gray-400">/</span>
//           <a href="#" className="text-blue-600">
//             Bài viết
//           </a>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Sidebar */}
//           <aside className="lg:col-span-1">
//             <div className="bg-white">
//               <h2 className="text-2xl font-bold mb-6">Chuyên mục</h2>

//               {categories.map((category, idx) => (
//                 <div key={idx} className="mb-6">
//                   <h3 className="font-bold text-gray-900 mb-3">{category.title}</h3>
//                   <ul className="space-y-2">
//                     {category.items.map((item, itemIdx) => (
//                       <li key={itemIdx}>
//                         <a href="#" className="text-blue-600 text-sm hover:underline">
//                           {item}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </aside>

//           {/* Center Content */}
//           <main className="lg:col-span-2">
//             <h1 className="text-3xl font-bold mb-8">BÀI VIẾT</h1>

//             {/* Articles Grid */}
//             <div className="space-y-8">
//               {articles.map((article, idx) => (
//                 <article key={idx} className="border-b border-gray-200 pb-8">
//                   <div className="flex gap-4">
//                     <div className="flex-1">
//                       <div className="text-blue-600 text-xs font-bold uppercase mb-2">{article.category}</div>
//                       <h3 className="text-lg font-bold mb-2 hover:text-blue-600 cursor-pointer">{article.title}</h3>
//                       <p className="text-gray-600 text-sm mb-4">{article.description}</p>
//                       <div className="text-gray-500 text-xs">
//                         {article.date} bởi {article.author}
//                       </div>
//                     </div>
//                     {article.featured && (
//                       <div className="w-24 h-24 bg-blue-100 rounded flex-shrink-0">
//                         {/* Placeholder for article image */}
//                       </div>
//                     )}
//                   </div>
//                 </article>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center gap-2 mt-8">
//               {[1, 2, 3, 4, 5].map((page) => (
//                 <button
//                   key={page}
//                   className={`px-3 py-2 rounded font-medium text-sm ${
//                     page === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>
//           </main>

//           {/* Right Sidebar */}
//           <aside className="lg:col-span-1">
//             {/* Search */}
//             <div className="mb-8 sticky top-24">
//               <h3 className="font-bold mb-4">Tìm kiếm bài viết</h3>
//               <div className="relative mb-6">
//                 <input
//                   type="text"
//                   placeholder="Nhập từ khoá bạn muốn tìm kiếm..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 <Search size={16} className="absolute right-3 top-3 text-gray-400" />
//               </div>

//               {/* Featured Courses */}
//               <h3 className="font-bold mb-4">Tìm hiểu thêm</h3>
//               <div className="space-y-3">
//                 {rightSidebarItems.map((item, idx) => (
//                   <div key={idx} className="pb-3 border-b border-gray-200 last:border-b-0">
//                     <h4 className="text-xs font-bold text-gray-900 mb-1">{item.title}</h4>
//                     <p className="text-xs text-gray-600">{item.description}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Review Section */}
//               <div className="mt-8">
//                 <h3 className="font-bold mb-4">Review của học viên STUDY4</h3>
//                 <p className="text-sm text-gray-600 mb-4">Xem thêm →</p>

//                 <div className="space-y-4">
//                   <div className="border border-gray-200 rounded p-3">
//                     <p className="text-xs font-bold text-gray-900 mb-1">
//                       Học viên đạt Overall 8.0 chia sẻ hành trình tự học 100% cùng STUDY4
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Chia sẻ từ bạn Võ Hoàng Huy về khóa học IELTS Intensive của STUDY4 và kinh nghiệm học tập...
//                     </p>
//                   </div>
//                   <div className="border border-gray-200 rounded p-3">
//                     <p className="text-xs font-bold text-gray-900 mb-1">
//                       Hành trình chinh phục 950 TOEIC của học viên STUDY4
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Chia sẻ từ bạn Thuỳ Vân về khóa học Complete TOEIC của STUDY4 và kinh nghiệm học tập...
//                     </p>
//                   </div>
//                   <div className="border border-gray-200 rounded p-3">
//                     <p className="text-xs font-bold text-gray-900 mb-1">
//                       Bí quyết chinh phục 900 TOEIC trong 6 tháng của học viên STUDY4
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Chia sẻ từ bạn Ngô Thị Mỹ Nga về khóa học Complete TOEIC của STUDY4 và kinh nghiệm...
//                     </p>
//                   </div>
//                 </div>

//                 <button className="w-full mt-4 text-blue-600 text-sm font-bold hover:underline">
//                   Tham gia nhóm facebook
//                 </button>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-12">
//         <div className="max-w-full">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="bg-blue-600 rounded px-2 py-1 font-bold text-sm">S</div>
//                 <span className="font-bold">STUDY4</span>
//               </div>
//               <p className="text-gray-400 text-sm">© STUDY4.COM</p>
//               <p className="text-gray-400 text-sm">Bản quyền của Công ty TNHH Công Nghệ A Plus</p>
//             </div>
//             <div>
//               <h5 className="font-bold mb-4">Về STUDY4</h5>
//               <ul className="space-y-2 text-gray-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h5 className="font-bold mb-4">Tài nguyên</h5>
//               <ul className="space-y-2 text-gray-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Điều khoản và Điều Kiện
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h5 className="font-bold mb-4">Chính sách chung</h5>
//               <ul className="space-y-2 text-gray-400 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách kiểm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách giao nhận
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Chính sách chuyển đổi, hoàn hủy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h5 className="font-bold mb-4">Thông tin doanh nghiệp</h5>
//             <p className="text-gray-400 text-sm font-bold">CÔNG TY TNHH CÔNG NGHỆ A PLUS</p>
//             <p className="text-gray-400 text-sm">Điện thoại liên hệ/Hotline: 096 369 5525</p>
//             <p className="text-gray-400 text-sm">Email: study4.team@gmail.com</p>
//             <p className="text-gray-400 text-sm mt-2">
//               Địa chỉ trụ sở: Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//             </p>
//             <p className="text-gray-400 text-sm">Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459</p>
//             <p className="text-gray-400 text-sm">Ngày cấp phép: 17/06/2021</p>
//           </div>

//           <div className="pt-8 border-t border-gray-800">
//             <p className="text-gray-400 text-xs">
//               IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//               Australia.
//             </p>
//             <p className="text-gray-400 text-xs mt-2">
//               ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS).
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



















 // Lịch học
// "use client"

// import { useState } from "react"
// import { Calendar, Plus, Search } from "lucide-react"

// export default function SchedulePage() {
//   const [activeTab, setActiveTab] = useState("my-schedule")

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//               <span className="text-white font-bold text-sm">S</span>
//             </div>
//             <span className="font-bold text-xl">STUDY4</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-8">
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Khóa học của tôi
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Chương trình học
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Đề thi online
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Flashcards
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Blog
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">
//               Kích hoạt tài khoản
//             </a>
//             <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
//               <span className="text-gray-600">👤</span>
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200 px-6 py-3">
//         <div className="max-w-7xl mx-auto text-sm text-gray-600">
//           Trang chủ / <span className="text-blue-600">Bài viết</span>
//         </div>
//       </div>

//       {/* Schedule Section Header */}
//       <div className="bg-gradient-to-r from-yellow-50 to-pink-50 px-6 py-8 w-full">
//         <div className="px-6">
//           <div className="flex items-center gap-3 mb-4">
//             <Calendar className="w-6 h-6 text-gray-800" />
//             <h1 className="text-3xl font-bold text-gray-800">Lịch học</h1>
//             <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition">
//               Tạo lịch học
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-6 border-b border-gray-300 mt-6">
//             <button
//               onClick={() => setActiveTab("my-schedule")}
//               className={`pb-3 font-medium transition ${
//                 activeTab === "my-schedule"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Lịch học của tôi
//             </button>
//             <button
//               onClick={() => setActiveTab("explore")}
//               className={`pb-3 font-medium transition ${
//                 activeTab === "explore"
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Khám phá
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full px-6 py-8">
//         <div className="grid grid-cols-3 gap-8">
//           {/* Left Content */}
//           <div className="col-span-2">
//             {/* Schedule Card */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               {/* Card Header */}
//               <div className="bg-gradient-to-r from-blue-50 to-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-900">Học TA</h3>
//                   <p className="text-sm text-gray-600">Tỷ lệ học TA</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
//                 </div>
//               </div>

//               {/* Card Content Tabs */}
//               <div className="border-b border-gray-200">
//                 <div className="flex gap-6 px-6">
//                   <button className="py-4 text-gray-800 font-medium border-b-2 border-blue-600 text-blue-600">
//                     Thời biểu
//                   </button>
//                   <button className="py-4 text-gray-600 font-medium hover:text-gray-900">Chính sách/Thêm mới</button>
//                 </div>
//               </div>

//               {/* Schedule Content */}
//               <div className="p-6">
//                 <button className="text-blue-600 font-medium flex items-center gap-2 mb-4 hover:text-blue-700">
//                   <Plus className="w-5 h-5" />
//                   Thêm To-do list
//                 </button>
//                 <p className="text-red-600 text-sm">
//                   Click vào nội dung để chỉnh sửa hoặc xóa nó. Nếu không có dễ sửa.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="space-y-6">
//             {/* Search Box */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Nhập từ khóa bài muốn tìm"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               />
//               <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
//             </div>

//             {/* Promotional Card 1 */}
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//               <div className="h-32 bg-gradient-to-r from-purple-400 to-red-400 relative flex items-center justify-center">
//                 <img src="/ielts-intensive-courses.jpg" alt="IELTS" className="w-24 h-24 object-cover" />
//               </div>
//               <div className="p-4 text-center">
//                 <p className="text-sm font-bold text-gray-800 mb-2">IELTS INTENSIVE COURSES</p>
//                 <p className="text-xs text-gray-600 mb-3">Listening, Reading, Writing, Speaking</p>
//                 <button className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700 transition">
//                   Join group
//                 </button>
//               </div>
//             </div>

//             {/* Promotional Card 2 */}
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//               <div className="h-32 bg-gradient-to-r from-pink-300 to-purple-400 relative flex items-center justify-center">
//                 <img src="/study4-extension.jpg" alt="Extension" className="w-24 h-24 object-cover" />
//               </div>
//               <div className="p-4 text-center">
//                 <p className="text-sm font-bold text-gray-800 mb-2">Trà lệ điểm, tập flashcards mỗi lập mọi nơi</p>
//                 <p className="text-xs text-gray-600 mb-3">STUDY4 EXTENSION</p>
//                 <button className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700 transition">
//                   Learn more
//                 </button>
//               </div>
//             </div>

//             {/* Facebook */}
//             <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//               <h4 className="font-bold text-gray-800 mb-3">Tham gia nhóm facebook</h4>
//               <img src="/facebook-group.jpg" alt="Facebook" className="w-full rounded mb-3" />
//               <p className="text-xs text-gray-600">Cộng đồng học tập STUDY4</p>
//             </div>

//             {/* Promotional Card 3 */}
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
//               <div className="h-32 bg-gradient-to-r from-blue-400 to-cyan-400 relative flex items-center justify-center">
//                 <img src="/toeic-community.jpg" alt="TOEIC" className="w-24 h-24 object-cover" />
//               </div>
//               <div className="p-4 text-center">
//                 <p className="text-sm font-bold text-gray-800 mb-2">Cộng đồng học TOEIC</p>
//                 <p className="text-xs text-gray-600 mb-3">trên STUDY4</p>
//                 <button className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700 transition">
//                   Join group
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-gray-300 mt-16 w-full">
//         <div className="px-6 py-12">
//           {/* Footer Content Grid */}
//           <div className="grid grid-cols-4 gap-8 mb-8">
//             {/* Column 1 */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">S</span>
//                 </div>
//                 <span className="font-bold text-white">STUDY4</span>
//               </div>
//               <p className="text-sm">© STUDY4.COM</p>
//               <p className="text-sm">Bản quyền của Công ty TNHH Công Nghệ A Plus</p>
//             </div>

//             {/* Column 2 */}
//             <div>
//               <h4 className="font-bold text-white mb-4">Về STUDY4</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 3 */}
//             <div>
//               <h4 className="font-bold text-white mb-4">Tài nguyên</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Điều khoản và Điều Kiện
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 4 */}
//             <div>
//               <h4 className="font-bold text-white mb-4">Chính sách chung</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Chính sách kiếm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Chính sách giao, nhận hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-blue-400 hover:text-blue-300">
//                     Chính sách chuyên đổi, hoàn hủy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Business Info */}
//           <div className="border-t border-gray-700 pt-8 mb-8">
//             <h4 className="font-bold text-white mb-4">Thông tin doanh nghiệp</h4>
//             <div className="text-sm space-y-2">
//               <p>CÔNG TY TNHH CÔNG NGHỆ A PLUS</p>
//               <p>Điện thoại liên hệ/Hotline: 096 369 5525</p>
//               <p>Email: study4.team@gmail.com</p>
//               <p>
//                 Địa chỉ trụ sở: Số 15, Ngõ 208 Giải Phóng, Phương Phương Liễt, Quận Thanh Xuân, Thành phố Hà Nội, Việt
//                 Nam
//               </p>
//               <p>Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp</p>
//               <p>Ngày cấp phép: 17/06/2021</p>
//             </div>
//           </div>

//           {/* Bottom Info */}
//           <div className="border-t border-gray-700 pt-8 text-xs text-gray-400">
//             <p className="mb-2">
//               IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//               Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//               Cambridge ESOL, the British Council, and IDP Education Australia.
//             </p>
//             <p>
//               ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//               not endorsed or approved by ETS.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }






































































































// KHÁM PHÁ


// "use client"

// import { useState } from "react"
// import { Search, Clock, Users } from "lucide-react"

// const courses = [
//   {
//     id: 1,
//     title: "Complete TOEIC 650+",
//     category: "Khóa học",
//     description:
//       "Dành cho các bạn hoàn toàn mới bắt đầu hoặc có kiến thức tương đối với các kỹ năng ngoại ngữ cơ bản và muốn nâng cao trình độ TOEIC lên 650+.",
//     features: [
//       { label: "Reading: tổng 3 phần", color: "cyan" },
//       { label: "Listening: tổng quát", color: "teal" },
//       { label: "Luyện nghe 20+ giờ", color: "pink" },
//     ],
//     details: [
//       {
//         title: "Reading: tổng 3 phần",
//         items: [
//           "Làm những trang bài ban đầu luyện tập (dành cho giai đoạn phối hợp)",
//           "Tự chơi các câu làm sai mà không dạo ghép thình chờ suy luân như chủ đề định tưỡng của định từng câp lên giàng / chửa dễ",
//           "Đơc giải thích chi tiết các câu không lý chứa được, học ưỡc clip giảng / chửa dễ",
//         ],
//       },
//       {
//         title: "Listening: tổng quát",
//         items: [
//           "Làm những trang part ban đầu luyện tập (dành thi gian 1 phút/câu)",
//           "Tự chơi các câu làm sai mà không dạo ghép thình chờ suy luân như chủ đề định tưỡng của định từng câp lên giàng",
//         ],
//       },
//       {
//         title: "Luyện nghe 20+ giờ",
//         items: [
//           "Học từ vựng (flashcards mới ngày 20-30 tự)",
//           "Học từ làm bài tập nghe phím 1-2 ngày học 1 chủ đề nghe phím)",
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Complete TOEIC 450+",
//     category: "Khóa học",
//     description:
//       "Dành cho các bạn hoàn toàn mới bắt đầu hoặc có kiến thức tương đối với các kỹ năng ngoại ngữ cơ bản và muốn nâng cao trình độ TOEIC lên 450+.",
//     features: [
//       { label: "Reading: tổng 3 phần", color: "cyan" },
//       { label: "Listening: tổng quát", color: "teal" },
//       { label: "Luyện nghe 20+ giờ", color: "pink" },
//     ],
//     details: [
//       {
//         title: "Reading: tổng 3 phần",
//         items: [
//           "Làm những trang bài ban đầu luyện tập (dành cho giai đoạn phối hợp)",
//           "Tự chơi các câu làm sai mà không dạo ghép thình chờ suy luân như chủ đề định tưỡng của định từng câp lên giàng",
//         ],
//       },
//       {
//         title: "Listening: tổng quát",
//         items: ["Làm những trang part ban đầu luyện tập (dành thi gian 1 phút/câu)"],
//       },
//       {
//         title: "Luyện nghe 20+ giờ",
//         items: [
//           "Học từ vựng (flashcards mới ngày 20-30 tự)",
//           "Học từ làm bài tập nghe phím 1-2 ngày học 1 chủ đề nghe phím)",
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "IELTS Fundamentals band 0-4",
//     category: "Khóa học",
//     description:
//       "Dành cho các bạn hoàn toàn mới bắt đầu hay IELTS Fundamentals của STUDY4. Học 1800 từ vựng và 29 chủ đề ngữ pháp trong 3 tháng. Mỗi ngày cần dành 2-3 giờ.",
//     features: [{ label: "Tiếng tổng", color: "cyan" }],
//     details: [
//       {
//         title: "Tiếng tổng",
//         items: [
//           "Học tiếm 20 từ mới và review flashcards của 100 phút",
//           "Học lý thuyết về làm tập nghe phím (5 ngày học 1 chủ đề nghe)",
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Listening Intensive band 7+",
//     category: "Khóa học",
//     description: "Lê Định học IELTS speaking mỗi ngày để nâng band hỏa qua. Yêu cầu đạo vào band 4 target band 6-6.5+.",
//     features: [
//       { label: "Liều nghe", color: "cyan" },
//       { label: "Luyện tập", color: "teal" },
//       { label: "Lâm full 1-4B listening, tổn bộ", color: "pink" },
//     ],
//     details: [
//       {
//         title: "Liều nghe",
//         items: ["Này yêu listening, mỗi ngày Nâng xấp 20 giữa mục chứn lã từ vàng"],
//       },
//       {
//         title: "Luyện tập",
//         items: ["Làm full 1 bài listening lần quá 60 phút, làm dàm 15-17 ngày"],
//       },
//       {
//         title: "Lâm full 1-4B listening, tổn bộ",
//         items: ["Tự chửa đề cái làm sai mà không dạo ghép thình chờ suy luân như chủ đề định"],
//       },
//     ],
//   },
// ]

// export default function ExplorePage() {
//   const [activeTab, setActiveTab] = useState("explore")
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredCourses = courses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const getTagColor = (color) => {
//     const colorMap = {
//       cyan: "bg-cyan-100 text-cyan-700",
//       teal: "bg-teal-100 text-teal-700",
//       pink: "bg-pink-100 text-pink-700",
//     }
//     return colorMap[color] || "bg-gray-100 text-gray-700"
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b bg-white sticky top-0 z-40">
//         <div className="w-full px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
//               S
//             </div>
//             <span className="font-bold text-lg">STUDY4</span>
//           </div>
//           <nav className="flex items-center gap-8">
//             <a href="#" className="text-gray-700 hover:text-gray-900">
//               Khóa học của tôi
//             </a>
//             <a href="#" className="text-gray-700 hover:text-gray-900">
//               Chương trình học
//             </a>
//             <a href="#" className="text-gray-700 hover:text-gray-900">
//               Đề thi online
//             </a>
//             <a href="#" className="text-gray-700 hover:text-gray-900">
//               Flashcards
//             </a>
//             <a href="#" className="text-gray-700 hover:text-gray-900">
//               Blog
//             </a>
//             <a href="#" className="text-gray-700 hover:text-gray-900">
//               Kích hoạt tài khoản
//             </a>
//           </nav>
//           <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//         </div>
//       </header>

//       {/* Breadcrumb */}
//       <div className="w-full px-6 py-2 text-sm text-gray-600">
//         <a href="#" className="hover:text-blue-600">
//           Trang chủ
//         </a>
//         <span className="mx-2">/</span>
//         <a href="#" className="hover:text-blue-600">
//           Bài viết
//         </a>
//       </div>

//       {/* Hero Section */}
//       <div className="w-full bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-200 px-6 py-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Clock className="w-6 h-6" />
//           <h1 className="text-3xl font-bold">Lịch học</h1>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 border-b border-gray-300">
//           <button
//             onClick={() => setActiveTab("my")}
//             className={`px-4 py-2 font-medium border-b-2 ${
//               activeTab === "my"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-600 hover:text-gray-900"
//             }`}
//           >
//             Lịch học của tôi
//           </button>
//           <button
//             onClick={() => setActiveTab("explore")}
//             className={`px-4 py-2 font-medium border-b-2 ${
//               activeTab === "explore"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-600 hover:text-gray-900"
//             }`}
//           >
//             Khám phá
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full px-6 py-8">
//         <div className="grid grid-cols-3 gap-8">
//           {/* Left Column - Courses */}
//           <div className="col-span-2 space-y-6">
//             <div className="space-y-6">
//               {filteredCourses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
//                       <p className="text-sm text-gray-600">{course.category}</p>
//                     </div>
//                     <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//                       Active
//                     </span>
//                   </div>

//                   <p className="text-gray-700 mb-4 text-sm leading-relaxed">{course.description}</p>

//                   {/* Feature Tags */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {course.features.map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTagColor(feature.color)}`}
//                       >
//                         {feature.label}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Details Grid */}
//                   <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded">
//                     {course.details.map((detail, idx) => (
//                       <div key={idx}>
//                         <h4 className="font-semibold text-sm text-gray-900 mb-2">{detail.title}</h4>
//                         <ul className="text-xs text-gray-700 space-y-1">
//                           {detail.items.map((item, itemIdx) => (
//                             <li key={itemIdx} className="flex gap-2">
//                               <span className="text-gray-400">•</span>
//                               <span>{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}
//                   </div>

//                   <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 font-medium text-sm">
//                     Sử dụng lịch học này
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className="space-y-6">
//             {/* Search */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Nhập từ khóa bài muốn tìm"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>

//             {/* Promo Box 1 */}
//             <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg overflow-hidden">
//               <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                 <div className="text-white text-center">
//                   <div className="font-bold">IELTS</div>
//                   <div className="text-xs">INTENSIVE COURSES</div>
//                 </div>
//               </div>
//               <div className="p-4 bg-white">
//                 <h4 className="font-semibold text-sm mb-2">IELTS INTENSIVE COURSES</h4>
//                 <p className="text-xs text-gray-600 mb-3">Listening, Reading, Writing, Speaking</p>
//                 <button className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700">
//                   Join group
//                 </button>
//               </div>
//             </div>

//             {/* Promo Box 2 */}
//             <div className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg overflow-hidden">
//               <div className="h-32 bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
//                 <div className="text-white text-center">Trả lệ diễm, tập flashcards mỗi lập mọi nơi</div>
//               </div>
//               <div className="p-4 bg-white">
//                 <h4 className="font-semibold text-sm mb-1">STUDY4 EXTENSION</h4>
//                 <p className="text-xs text-gray-600">Chrome Extension</p>
//               </div>
//             </div>

//             {/* Promo Box 3 */}
//             <div className="border border-gray-200 rounded-lg p-4">
//               <h4 className="font-semibold text-sm mb-3">Tham gia nhóm facebook</h4>
//               <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">
//                 <Users className="w-8 h-8" />
//               </div>
//               <button className="w-full border border-gray-300 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-50">
//                 Tham gia nhóm
//               </button>
//             </div>

//             {/* Promo Box 4 */}
//             <div className="border border-gray-200 rounded-lg p-4">
//               <h4 className="font-semibold text-sm mb-3">Cộng đồng học TOEIC</h4>
//               <p className="text-xs text-gray-600 mb-3">Public Group • 1.2M members</p>
//               <button className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700">
//                 Join group
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 mt-16 w-full">
//         <div className="w-full px-6 py-12">
//           <div className="grid grid-cols-4 gap-8 mb-12">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-6 h-6 bg-blue-600 rounded-md"></div>
//                 <span className="font-bold text-white">STUDY4</span>
//               </div>
//               <p className="text-sm">© STUDY4.COM</p>
//               <p className="text-sm">Bản quyền của Công ty TNHH Công Nghệ A Plus</p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-white mb-4">Về STUDY4</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Giới thiệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Thư viện đề thi
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Hướng dẫn sử dụng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Liên hệ
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-white mb-4">Tài nguyên</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Hướng dẫn thanh toán
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Điều khoản bảo mật
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Tổng hợp tài liệu
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Điều khoản và Điều Kiện
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-white mb-4">Chính sách chung</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Chính sách kiếm hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Chính sách giao, nhận hàng
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Phản hồi, khiếu nại
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-400">
//                     Chính sách chuyên đổi, hoàn hủy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8">
//             <h4 className="font-semibold text-white mb-3">Thông tin doanh nghiệp</h4>
//             <p className="text-sm mb-2">
//               <span className="font-semibold">CÔNG TY TNHH CÔNG NGHỆ A PLUS</span>
//             </p>
//             <p className="text-sm mb-2">Điện thoại liên hệ/Hotline: 096 369 5525</p>
//             <p className="text-sm mb-2">Email: study4.team@gmail.com</p>
//             <p className="text-sm mb-2">
//               Địa chỉ trụ sở: Số 15, Ngõ 208 Giải Phóng, Phương Phương Liễt, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam
//             </p>
//             <p className="text-sm mb-2">
//               Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp
//             </p>
//             <p className="text-sm">Ngày cấp phép: 17/06/2021</p>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-xs text-gray-500">
//             <p className="mb-2">
//               IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
//               Australia. This site and its owners are not affiliated, approved or endorsed by the University of
//               Cambridge ESOL, the British Council, and IDP Education Australia.
//             </p>
//             <p>
//               ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
//               not endorsed or approved by ETS.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }





















































// Lịch sử bài thi

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("results")

  const testResults = [
    {
      id: 1,
      name: "New Economy TOEIC Test 1",
      date: "12/10/2025",
      score: "83/200",
      totalScore: 420,
      duration: "1:20:14",
      type: "Full test",
    },
    {
      id: 2,
      name: "IELTS Academic Practice Test 2",
      date: "08/10/2025",
      score: "6.5",
      totalScore: 9,
      duration: "2:45:30",
      type: "Full test",
    },
    {
      id: 3,
      name: "TOEIC Listening & Reading Mock",
      date: "05/10/2025",
      score: "765/990",
      totalScore: 990,
      duration: "2:10:00",
      type: "Full test",
    },
  ]

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-2xl font-bold">STUDY4</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Khóa học của tôi
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Chương trình học
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Đề thi online
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Flashcards
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Kích hoạt tài khoản
            </Link>
          </nav>

          <button className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="w-full">
        {/* Banner */}
        <div className="w-full bg-white px-8 py-12">
          <div className="w-full">
            <div className="w-full h-24 bg-gradient-to-r from-blue-300 via-blue-500 to-orange-400 rounded-lg relative mb-8 flex items-center justify-center overflow-hidden">
              <div className="absolute left-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-transparent opacity-60 rounded-full -translate-x-16 -translate-y-8"></div>
              <div className="absolute right-1/3 top-0 w-40 h-40 bg-gradient-to-bl from-orange-400 to-transparent opacity-50 rounded-full"></div>

              <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  B
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">billveoth</h1>
              <p className="text-gray-600 text-sm">Trang cá nhân công khai</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("courses")}
                className={`pb-4 font-medium text-base transition-colors ${
                  activeTab === "courses"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Khóa học
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`pb-4 font-medium text-base transition-colors ${
                  activeTab === "results"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Kết quả luyện thi
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full bg-gray-50 px-8 py-8">
          {activeTab === "results" && (
            <div className="space-y-6">
              <div className="flex justify-center mb-8">
                <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Tới trang thống kê kết quả luyện thi
                </button>
              </div>

              {testResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {result.name}
                        </h3>
                        <div className="inline-flex px-2 py-1 bg-green-100 rounded text-green-700 text-xs font-medium">
                          {result.type}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Ngày làm</p>
                          <p className="text-gray-900 font-medium">{result.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Kết quả</p>
                          <p className="text-gray-900 font-medium">
                            {result.score} (Điểm: {result.totalScore})
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Thời gian làm bài</p>
                          <p className="text-gray-900 font-medium">{result.duration}</p>
                        </div>
                      </div>
                    </div>

                    <button className="px-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "courses" && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Bạn chưa đăng ký khóa học nào</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-gray-300 px-8 py-12 mt-12">
        <div className="w-full grid grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-sm">
                S
              </div>
              <span className="font-bold">STUDY4</span>
            </div>
            <p className="text-sm">© STUDY4.COM</p>
            <p className="text-sm">Bản quyền của Công ty TNHH Công Nghệ A Plus</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Về STUDY4</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Giới thiệu</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Thư viện đề thi</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Hướng dẫn sử dụng</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Liên hệ</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Tài nguyên</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Hướng dẫn thanh toán</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Điều khoản bảo mật</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Tổng hợp tài liệu</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Điều khoản & Điều kiện</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Chính sách chung</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Chính sách kiểm hàng</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Chính sách giao hàng</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Phản hồi & khiếu nại</Link></li>
              <li><Link to="#" className="text-blue-400 hover:text-blue-300">Chính sách đổi & hoàn</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-xs text-gray-500">
          <p className="mb-2">
            IELTS is a registered trademark of University of Cambridge, the British Council, and IDP Education
            Australia. This site and its owners are not affiliated, approved or endorsed by them.
          </p>
          <p>
            ETS®, TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This web site is
            not endorsed or approved by ETS.
          </p>
        </div>
      </footer>
    </div>
  )
}
