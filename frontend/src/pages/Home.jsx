"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Users, Tag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Study4Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    subject: "",
  });

  const courses = [
    {
      id: 1,
      title: "[Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation",
      subtitle: "[Tặng khoá TED Talks]",
      students: "16,335",
      reviews: 211,
      price: 699000,
      originalPrice: 899000,
      discount: -22,
      category: "#Phần mềm online",
    },
    {
      id: 2,
      title: "[IELTS Fundamentals] Từ vựng và ngữ pháp cơ bản IELTS",
      students: "36,603",
      reviews: 260,
      price: 989000,
      originalPrice: 1800000,
      discount: -45,
      category: "#Phần mềm online",
    },
    {
      id: 3,
      title:
        "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
      students: "30,506",
      reviews: 222,
      price: 699000,
      originalPrice: 899000,
      discount: -22,
      category: "#Phần mềm online",
    },
  ];

  const latestTests = [
    { id: 1, title: "IELTS Simulation Listening test 1", duration: "40 phút", views: 1269753, attempts: 3379, parts: 4, questions: 40 },
    { id: 2, title: "IELTS Simulation Listening test 10", duration: "40 phút", views: 426969, attempts: 1045, parts: 4, questions: 40 },
    { id: 3, title: "IELTS Simulation Listening test 2", duration: "40 phút", views: 528429, attempts: 972, parts: 4, questions: 40 },
    { id: 4, title: "IELTS Simulation Listening test 3", duration: "40 phút", views: 346089, attempts: 559, parts: 4, questions: 40 },
    { id: 5, title: "IELTS Simulation Listening test 4", duration: "40 phút", views: 269931, attempts: 495, parts: 4, questions: 40 },
    { id: 6, title: "IELTS Simulation Listening test 5", duration: "40 phút", views: 238410, attempts: 376, parts: 4, questions: 40 },
    { id: 7, title: "IELTS Simulation Listening test 6", duration: "40 phút", views: 213135, attempts: 388, parts: 4, questions: 40 },
    { id: 8, title: "IELTS Simulation Listening test 7", duration: "40 phút", views: 153807, attempts: 279, parts: 4, questions: 40 },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % courses.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);

  return (
    <div className="w-full bg-white">
      {/* Header tái sử dụng */}
      <Header
        brand={{ name: "Elearning", abbr: "P" }}
        // Nếu dùng react-router, bạn có thể truyền currentPath = location.pathname
        currentPath="/"
        onLoginClick={() => console.log("Login clicked")}
      />

      {/* Hero Carousel */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-12">
        <div className="w-full px-6">
          <div className="relative flex items-center justify-center gap-4">
            <button onClick={prevSlide} className="p-2 hover:bg-white rounded-full transition" type="button">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex-1 max-w-4xl">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{courses[currentSlide].title}</h2>
                {courses[currentSlide].subtitle && (
                  <p className="text-blue-600 mb-4">{courses[currentSlide].subtitle}</p>
                )}
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-sm text-gray-600">👥 {courses[currentSlide].students} Học viên</span>
                  <span className="text-sm text-gray-600">⭐ ({courses[currentSlide].reviews})</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {courses[currentSlide].price.toLocaleString()}đ
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {courses[currentSlide].originalPrice.toLocaleString()}đ
                  </span>
                  <span className="text-red-600 font-bold">{courses[currentSlide].discount}%</span>
                </div>
              </div>
            </div>

            <button onClick={nextSlide} className="p-2 hover:bg-white rounded-full transition" type="button">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="w-full bg-white py-12 border-b border-gray-200">
        <div className="w-full px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Khóa học online nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span>👥 {course.students} Học viên</span>
                  <span>⭐ ({course.reviews})</span>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold text-gray-900">{course.price.toLocaleString()}đ</span>
                  <span className="text-sm text-gray-400 line-through">{course.originalPrice.toLocaleString()}đ</span>
                  <span className="text-red-600 font-bold text-sm">{course.discount}%</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-gray-50 py-12 border-b border-gray-200">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Về P Elearning</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Các khóa học lập trình trực tuyến chất lượng cao của P Elearning được thiết kế sát với thực
              tiễn công nghiệp, theo chương trình tiêu chuẩn từ cơ bản đến chuyên sâu với nhiều tính năng hiện đại
              và hệ thống bài thực hành (Code Lab, Dự án thực tế, Thử thách thuật toán) phong phú đa dạng.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nền tảng học lập trình của chúng tôi bao gồm các tính năng chuyên sâu và lộ trình học tập cá nhân hóa
              để giúp bạn chinh phục các kỹ năng và công nghệ quan trọng trong ngành. P Elearning áp dụng những công
              nghệ tối ưu vào học tập như môi trường Code Editor tích hợp để thực hành trực tiếp, hệ thống chấm bài
              tự động AI kiểm tra độ chính xác và hiệu suất code của bạn, cùng các dự án mô phỏng thực tế.
              Toàn bộ quá trình học tập của bạn sẽ được thống kê chi tiết theo ngày và theo từng module/ngôn ngữ
              để bạn có thể dễ dàng theo dõi tiến độ và điều chỉnh lộ trình học tập một cách phù hợp nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="w-full bg-[#e8f1ff] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-gray-800 space-y-6">
            <h2 className="text-3xl font-extrabold text-[#0052CC] leading-tight">
              Các Khóa Học Lập Trình & Công Nghệ Trực Tuyến Chất Lượng Cao
            </h2>
            <p>
              Chúng tôi cung cấp các khóa học chuyên sâu giúp bạn phát triển kỹ năng lập trình một cách hiệu quả.
              Các bài luyện tập đa dạng từ cơ bản đến nâng cao với giao diện thân thiện, dễ sử dụng và phù hợp với
              mọi cấp độ, từ người mới bắt đầu đến lập trình viên muốn nâng cao.
            </p>
            <p>
              Lộ trình học được thiết kế bám sát nhu cầu thị trường và được tối ưu để giúp bạn thành thạo
              công nghệ và tạo ra sản phẩm thực tế nhanh chóng.
            </p>
            <p className="font-medium text-[#0052CC]">
              Hỗ trợ học thử miễn phí – đánh giá năng lực hiện tại và tư vấn lộ trình học lập trình phù hợp
              (ví dụ: Lập trình Web, Phát triển Ứng dụng Di động, Khoa học Dữ liệu)!
            </p>
          </div>

          {/* Form Card + Chat Button */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Chat Icon */}
            <button
              className="absolute -top-4 -right-4 bg-[#0052CC] w-14 h-14 rounded-full shadow-xl
              flex items-center justify-center text-white text-lg hover:bg-blue-900 transition"
              aria-label="Chat AI"
              type="button"
            >
              💬
            </button>

            {/* Form */}
            <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Tư vấn lộ trình học</h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên*"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại*"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
                />

                <input
                  type="text"
                  name="region"
                  placeholder="Khu vực học (Thành phố/Tỉnh)*"
                  value={formData.region}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
                />

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] outline-none"
                >
                  <option value="">Môn học bạn quan tâm</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEIC">TOEIC</option>
                  <option value="HSK">HSK</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-[#0052CC] text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition"
                >
                  Đăng ký tư vấn miễn phí
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Tests */}
      <section className="w-full bg-gray-50 py-12 border-b border-gray-200">
        <div className="w-full px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Đề thi mới nhất</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTests.map((test) => (
              <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <h3 className="font-bold text-gray-900 mb-3 text-sm line-clamp-2">{test.title}</h3>
                <div className="space-y-2 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{`${test.views.toLocaleString()} | ${test.attempts}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{`${test.parts} phần thi | ${test.questions} câu hỏi`}</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">#IELTS Academic</span>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">#Listening</span>
                </div>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">
                  Chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="w-full bg-white py-12 border-b border-gray-200">
        <div className="w-full px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cộng đồng Học tập P Elearning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                Thành thạo Lập trình, Công nghệ, Thuật toán... không giới hạn
              </h3>
              <p className="text-gray-700">
                và hơn 1 triệu lập trình viên đang hoạt động mỗi tháng
                (nếu con số này là thật, nếu không, bạn có thể thay bằng con số thực tế hoặc viết:
                "và cộng đồng lập trình viên lớn mạnh")
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Cộng đồng lập trình sôi nổi với hơn 1 triệu thành viên hoạt động mỗi tháng (Điều chỉnh con số nếu cần thiết).",
                  "Đặt câu hỏi code cho đội ngũ hỗ trợ kỹ thuật và các lập trình viên khác để nhận giải đáp và gợi ý chỉ sau 30 phút.",
                  "Chia sẻ kinh nghiệm học tập, debug code và cùng làm dự án với các thành viên khác.",
                  "Thực hành kỹ năng phỏng vấn (Mock Interview) & Review Code (Đánh giá code) và nhận được nhận xét, chấm điểm từ bạn học và chuyên gia.",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-blue-600">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
                Bắt đầu học code
              </button>
            </div>
            <div className="bg-blue-50 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">1M+</div>
                <p className="text-gray-700">Học viên hoạt động mỗi tháng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}




