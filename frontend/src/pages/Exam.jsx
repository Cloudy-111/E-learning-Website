
"use client"

import { useState } from "react"
import { Search, User, Facebook, Twitter, Linkedin, Youtube, Music } from "lucide-react"

const Study4TestLibrary = () => {
  const [selectedTab, setSelectedTab] = useState("Tất cả")
  const [currentPage, setCurrentPage] = useState(1)
  const testsPerPage = 16

  const EXAM_TYPES = [
    "Tất cả",
    "IELTS Academic",
    "IELTS General",
    "TOEIC",
    "TOEIC SW",
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
    "Digital SAT",
    "TOPIK I",
    "TOPIK II",
    "Tiếng Anh THPT100",
    "Hóa học THPT100",
    "Toán THPT100",
    "Sinh học THPT100",
    "Vật lý THPT100",
    "ACT",
  ]

  const TESTS = [
    {
      id: 1,
      title: "IELTS Simulation Listening test 1",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 2,
      title: "IELTS Simulation Listening test 10",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 3,
      title: "IELTS Simulation Listening test 2",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 4,
      title: "IELTS Simulation Listening test 3",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 5,
      title: "IELTS Simulation Listening test 4",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 6,
      title: "IELTS Simulation Listening test 5",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 7,
      title: "IELTS Simulation Listening test 6",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 8,
      title: "IELTS Simulation Listening test 7",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 9,
      title: "IELTS Simulation Listening test 8",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 10,
      title: "IELTS Simulation Listening test 9",
      duration: "30 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Listening",
    },
    {
      id: 11,
      title: "IELTS Simulation Reading test 1",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 12,
      title: "IELTS Simulation Reading test 10",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 13,
      title: "IELTS Simulation Reading test 2",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 14,
      title: "IELTS Simulation Reading test 3",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 15,
      title: "IELTS Simulation Reading test 4",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 16,
      title: "IELTS Simulation Reading test 5",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 17,
      title: "IELTS Simulation Reading test 6",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 18,
      title: "IELTS Simulation Reading test 7",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 19,
      title: "IELTS Simulation Reading test 8",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
    {
      id: 20,
      title: "IELTS Simulation Reading test 9",
      duration: "60 phút",
      questions: 40,
      price: 49000,
      type: "IELTS Academic",
      category: "Reading",
    },
  ]

  const filteredTests = selectedTab === "Tất cả" ? TESTS : TESTS.filter((test) => test.type === selectedTab)
  const totalPages = Math.ceil(filteredTests.length / testsPerPage)
  const startIdx = (currentPage - 1) * testsPerPage
  const paginatedTests = filteredTests.slice(startIdx, startIdx + testsPerPage)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#e0e0e0] sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#35509a] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-[#1a1a1a]">STUDY4</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#677788]">
            <a href="#" className="hover:text-[#35509a]">
              Khóa học của tôi
            </a>
            <a href="#" className="hover:text-[#35509a]">
              Chương trình học
            </a>
            <a href="#" className="hover:text-[#35509a]">
              Đề thi online
            </a>
            <a href="#" className="hover:text-[#35509a]">
              Flashcards
            </a>
            <a href="#" className="hover:text-[#35509a]">
              Blog
            </a>
            <a href="#" className="hover:text-[#35509a]">
              Kích hoạt tài khoản
            </a>
          </nav>

          <button className="p-2 hover:bg-[#f8f9fa] rounded-full">
            <User size={20} className="text-[#677788]" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-6">
        <div className="px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Test Library */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl font-bold text-[#1a1a1a] mb-6">Thư viện đề thi</h1>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-[#e0e0e0]">
                {EXAM_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedTab(type)
                      setCurrentPage(1)
                    }}
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      selectedTab === type
                        ? "bg-[#35509a] text-white"
                        : "bg-[#f8f9fa] text-[#677788] hover:bg-[#efefef]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa bạn muốn tìm kiếm, tên sách, tên câu hỏi..."
                    className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg text-sm focus:outline-none focus:border-[#35509a]"
                  />
                  <Search size={18} className="absolute right-3 top-2.5 text-[#8c98a4]" />
                </div>
                <button className="px-6 py-2 bg-[#35509a] text-white rounded-lg font-medium hover:bg-[#2a3f7a] transition-colors">
                  Tìm kiếm
                </button>
              </div>

              {/* Tests Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {paginatedTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white border border-[#e0e0e0] rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-[#1a1a1a] mb-2 text-sm line-clamp-2">{test.title}</h3>
                    <div className="space-y-1 mb-3 text-xs text-[#677788]">
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>{test.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📝</span>
                        <span>{test.questions} câu hỏi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>💰</span>
                        <span>{test.price.toLocaleString()} đ</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-[#e8f2ff] text-[#35509a] rounded">@{test.type}</span>
                      <span className="text-xs px-2 py-1 bg-[#e8f2ff] text-[#35509a] rounded">#{test.category}</span>
                    </div>
                    <button className="w-full py-2 border border-[#35509a] text-[#35509a] rounded-lg text-sm font-medium hover:bg-[#f0f8ff] transition-colors">
                      Chỉ tiết
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button className="px-3 py-2 bg-[#35509a] text-white rounded-lg text-sm font-medium">1</button>
                {[2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="px-3 py-2 border border-[#e0e0e0] text-[#677788] rounded-lg text-sm hover:bg-[#f8f9fa]"
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 border border-[#e0e0e0] text-[#677788] rounded-lg text-sm hover:bg-[#f8f9fa]">
                  ›
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {/* User Profile Card */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4 text-center">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">B</span>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">bilkecith</h3>
                <p className="text-xs text-[#677788] mb-3">
                  Đã học chưa có mục tiêu đề quá mục luyện tập của bạn. Tạo ngay
                </p>
                <button className="w-full py-2 bg-[#35509a] text-white rounded-lg text-sm font-medium hover:bg-[#2a3f7a] transition-colors">
                  Thống kê kết quả
                </button>
              </div>

              {/* IELTS Banner */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                <img src="/ielts-exam-preparation-banner.jpg" alt="IELTS Banner" className="w-full h-40 object-cover" />
              </div>

              {/* Score Calculator */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 font-bold">📊</span>
                  </div>
                  <h4 className="font-semibold text-[#1a1a1a] text-sm">SCORE CALCULATOR</h4>
                </div>
                <p className="text-xs text-[#677788] mb-3">Tính điểm thi IELTS</p>
                <button className="w-full py-2 bg-[#35509a] text-white rounded-lg text-sm font-medium hover:bg-[#2a3f7a] transition-colors">
                  Tính điểm
                </button>
              </div>

              {/* Study4 Extension */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">🔧</span>
                  </div>
                  <h4 className="font-semibold text-[#1a1a1a] text-sm">STUDY4 EXTENSION</h4>
                </div>
                <p className="text-xs text-[#677788] mb-3">Trợ giúp phần facebook</p>
                <button className="w-full py-2 bg-[#35509a] text-white rounded-lg text-sm font-medium hover:bg-[#2a3f7a] transition-colors">
                  Cài đặt
                </button>
              </div>

              {/* Facebook Page */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg p-4">
                <img
                  src="/facebook-page-preview.jpg"
                  alt="Facebook Page"
                  className="w-full h-24 object-cover rounded mb-3"
                />
                <p className="text-xs text-[#677788] text-center">Theo dõi trang Facebook</p>
              </div>

              {/* Course Promotion 1 */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                <img src="/ielts-course-promotion.jpg" alt="Course Promo" className="w-full h-24 object-cover" />
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#1a1a1a] mb-2">Công đăng luyện thi IELTS trên STUDY4</p>
                  <button className="w-full py-2 bg-[#35509a] text-white rounded-lg text-sm font-medium hover:bg-[#2a3f7a] transition-colors">
                    Xem khóa học
                  </button>
                </div>
              </div>

              {/* Course Promotion 2 */}
              <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                <img src="/toeic-course-promotion.jpg" alt="TOEIC Course" className="w-full h-24 object-cover" />
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#1a1a1a] mb-2">Công đăng luyện thi TOEIC trên STUDY4</p>
                  <button className="w-full py-2 bg-[#35509a] text-white rounded-lg text-sm font-medium hover:bg-[#2a3f7a] transition-colors">
                    Xem khóa học
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white mt-16">
        <div className="px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#677788]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#35509a] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-lg">STUDY4</span>
              </div>
              <div className="flex gap-3">
                <Facebook size={18} className="hover:text-[#35509a] cursor-pointer" />
                <Twitter size={18} className="hover:text-[#35509a] cursor-pointer" />
                <Linkedin size={18} className="hover:text-[#35509a] cursor-pointer" />
                <Youtube size={18} className="hover:text-[#35509a] cursor-pointer" />
                <Music size={18} className="hover:text-[#35509a] cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Về STUDY4</h4>
              <ul className="space-y-2 text-sm text-[#bdc5d1]">
                <li>
                  <a href="#" className="hover:text-white">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Điều khoản bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Điều khoản sử dụng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tài nguyên</h4>
              <ul className="space-y-2 text-sm text-[#bdc5d1]">
                <li>
                  <a href="#" className="hover:text-white">
                    Thư viện đề thi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tổng hợp tài liệu
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Chính sách chung</h4>
              <ul className="space-y-2 text-sm text-[#bdc5d1]">
                <li>
                  <a href="#" className="hover:text-white">
                    Hướng dẫn sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Hướng dẫn thanh toán
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Chính sách hoàn tiền
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Chính sách giảm giá
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Chính sách giao hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Phản hồi, Khiếu nại
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Chính sách chuyên đề, hỏi hay
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-[#8c98a4] space-y-2">
            <p>
              <strong>Thông tin doanh nghiệp</strong>
            </p>
            <p>Công ty Cổ phần Công nghệ & Phát triển Giáo dục PLUS</p>
            <p>Điện thoại đặc hạn Hotline: 096 360 5323</p>
            <p>Email: study4.vn@gmail.com</p>
            <p>Địa chỉ: Tầng 3, Tòa nhà Hòa Bình, Phố Phương Liên, Quận Đống Đa, Thành phố Hà Nội, Việt Nam</p>
            <p>Giấy chứng nhận Đăng ký doanh nghiệp số 0107645945 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp</p>
            <p>Giấy phép ICP: 17/06-2021</p>
            <p>© STUDY4.COM © Bản quyền của Công ty Cổ phần Công nghệ & Phát triển Giáo dục PLUS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Study4TestLibrary
