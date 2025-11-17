// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Courses from "./pages/Courses.jsx";
// import CourseDetail from "./pages/CourseDetail.jsx";   // <-- thêm
// import ClassRoom from "./pages/ClassRoom.jsx";         // <-- thêm
// import Discussion from "./pages/Discussion.jsx";       // <-- thêm
// import Login from "./pages/Login.jsx";                 // <-- thêm
// import Register from "./pages/Register.jsx";           // <-- thêm
// import Blog from "./pages/Blog.jsx";
// import ProfilePage from "./pages/Test.jsx";
// import HistoryTest from "./pages/HistoryTest.jsx";
// import Discover from "./pages/Discover.jsx";
// import SchedulePage from "./pages/SchedulePage.jsx";
// import IELTSResultsPage from "./pages/ResultTest.jsx";
// import Learning from "./pages/Learning.jsx";
// import QuizTest from "./pages/QuizTest.jsx";
// import Menut from "./pages/Menut.jsx";
// import Menu from "./pages/MenuS.jsx";
// import DiscussionDetail from "./pages/DiscussionDetail.jsx";
// import About from "./pages/About.jsx";
// import Membership from "./pages/MemberShip.jsx";
// import Study4TestLibrary from "./pages/Exam.jsx";
// import Payment from "./pages/Payment.jsx";
// import BlogDetail from "./pages/BlogDetail.jsx";
// import Dashboard from "./pages/DashBoard.jsx";
// import ExamDetail from "./pages/Test.jsx";
// import { useEffect } from "react";
// import { useAuth } from "./store/auth";

// // import Header from "./components/Header";         // <— thêm

// export default function App() {
//   const { hydrate, user, logout } = useAuth();

//   useEffect(() => { hydrate(); }, [hydrate]);

//   return (
//     <BrowserRouter>
//       {/* container full màn */}
//       <div className="min-h-screen bg-white flex flex-col">

//         {/* phần nội dung chiếm hết chiều cao còn lại */}
//         <main className="flex-1">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/blog/:id" element={<BlogDetail />} />
//             <Route path="/membership" element={<Membership />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/menuS" element={<Menu />} />
//             <Route path="/courses" element={<Courses />} />
//             <Route path="/courses/:id" element={<CourseDetail />} />
//             <Route path="/discussion/:id" element={<DiscussionDetail />} />
//             <Route path="/class/:id" element={<ClassRoom />} />
//             <Route path="/discussion" element={<Discussion />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/quiztest" element={<QuizTest />} />
//             <Route path="/resultstest" element={<IELTSResultsPage />} />
//             <Route path="/historytest" element={<HistoryTest />} />
//             <Route path="/learning" element={<Learning />} />
//             <Route path="/discover" element={<Discover />} />
//             <Route path="/exam" element={<Study4TestLibrary />} />
//             <Route path="/schedule" element={<SchedulePage />} />
//             <Route path="/test" element={<ExamDetail />} />
//             <Route path="/exam/:id" element={<ExamDetail />} />
//             <Route path="/menut" element={<Menut />} />
//             <Route path="/exam/:id/start" element={<QuizTest />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }































// "use client";

// import { Suspense, lazy, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./store/auth";

// /* ---------------- Lazy-loaded pages (code-splitting) ---------------- */
// // Public & common
// const Home = lazy(() => import("./pages/Home.jsx"));
// const Discover = lazy(() => import("./pages/Discover.jsx"));
// const Courses = lazy(() => import("./pages/Courses.jsx"));
// const CourseDetail = lazy(() => import("./pages/CourseDetail.jsx"));
// const Study4TestLibrary = lazy(() => import("./pages/Exam.jsx"));      // /exam
// const ExamDetail = lazy(() => import("./pages/Test.jsx"));             // /exam/:id (giới thiệu)
// const Blog = lazy(() => import("./pages/Blog.jsx"));
// const BlogDetail = lazy(() => import("./pages/BlogDetail.jsx"));
// const About = lazy(() => import("./pages/About.jsx"));
// const Membership = lazy(() => import("./pages/MemberShip.jsx"));
// const Payment = lazy(() => import("./pages/Payment.jsx"));
// const Menut = lazy(() => import("./pages/Menut.jsx"));                 // /test (menu nội bộ)
// const Login = lazy(() => import("./pages/Login.jsx"));
// const Register = lazy(() => import("./pages/Register.jsx"));

// // Extra public (nếu cần)
// const Discussion = lazy(() => import("./pages/Discussion.jsx"));
// const DiscussionDetail = lazy(() => import("./pages/DiscussionDetail.jsx"));
// const SchedulePage = lazy(() => import("./pages/SchedulePage.jsx"));
// const ClassRoom = lazy(() => import("./pages/ClassRoom.jsx"));

// // Student (/s/*)
// const S_Dashboard = lazy(() => import("./pages/DashBoard.jsx"));       // gán làm /s/dashboard
// const S_Enrollments = lazy(() => import("./pages/Enrollments.jsx"));   // bạn tạo file này
// const S_Learning = lazy(() => import("./pages/Learning.jsx"));         // /s/learning/:courseId
// const S_LessonDetail = lazy(() => import("./pages/LessonDetail.jsx")); // bạn tạo file này
// const S_CancelEnroll = lazy(() => import("./pages/CancelEnroll.jsx")); // bạn tạo file này
// const S_HistoryTest = lazy(() => import("./pages/HistoryTest.jsx"));
// const S_ExamList = lazy(() => import("./pages/StudentExamList.jsx"));  // bạn tạo file này
// const S_ExamIntro = lazy(() => import("./pages/StudentExamIntro.jsx"));// bạn tạo file này
// const S_TakeExam = lazy(() => import("./pages/QuizTest.jsx"));         // /s/exam/:id/take/:attemptId
// const S_ResultDetail = lazy(() => import("./pages/ResultDetail.jsx")); // bạn tạo file này
// const S_ResultsAgg = lazy(() => import("./pages/ResultTest.jsx"));     // /s/resultstest
// const S_Profile = lazy(() => import("./pages/Profile.jsx"));           // bạn tạo file này

// // Instructor (/i/*)
// const I_Dashboard = lazy(() => import("./pages/instructor/Dashboard.jsx"));     // bạn tạo file này
// const I_Courses = lazy(() => import("./pages/instructor/Courses.jsx"));         // bạn tạo file này
// const I_CourseNew = lazy(() => import("./pages/instructor/CourseNew.jsx"));     // bạn tạo file này
// const I_CourseEdit = lazy(() => import("./pages/instructor/CourseEdit.jsx"));   // bạn tạo file này
// const I_CourseLessons = lazy(() => import("./pages/instructor/CourseLessons.jsx"));// bạn tạo file này
// const I_CourseStudents = lazy(() => import("./pages/instructor/CourseStudents.jsx"));
// const I_CourseStudentDetail = lazy(() => import("./pages/instructor/CourseStudentDetail.jsx"));
// const I_CourseReviews = lazy(() => import("./pages/instructor/CourseReviews.jsx"));
// const I_Exams = lazy(() => import("./pages/instructor/Exams.jsx"));
// const I_ExamNew = lazy(() => import("./pages/instructor/ExamNew.jsx"));
// const I_ExamEdit = lazy(() => import("./pages/instructor/ExamEdit.jsx"));
// const I_ExamStats = lazy(() => import("./pages/instructor/ExamStats.jsx"));
// const I_ExamAttempts = lazy(() => import("./pages/instructor/ExamAttempts.jsx"));

// /* ---------------- Helpers ---------------- */
// function ScrollToTop() {
//   // đơn giản: luôn cuộn lên top khi mount route
//   return null;
// }

// function Loader() {
//   return (
//     <div className="min-h-[40vh] w-full flex items-center justify-center text-slate-500">
//       Đang tải…
//     </div>
//   );
// }

// /* ---------------- Guards ---------------- */
// function RequireAuth() {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   return <Outlet />;
// }

// function RequireRole({ allow }: { allow: ("student" | "instructor")[] }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   const ok = allow.includes(user.role); // giả định user.role là 'student' | 'instructor'
//   if (!ok) return <Navigate to="/" replace />;
//   return <Outlet />;
// }

// /* ---------------- App Root ---------------- */
// export default function App() {
//   const { hydrate } = useAuth();
//   useEffect(() => { hydrate(); }, [hydrate]);

//   return (
//     <BrowserRouter>
//       {/* Full-screen container */}
//       <div className="min-h-screen w-screen bg-white flex flex-col">
//         <ScrollToTop />

//         <main className="flex-1">
//           <Suspense fallback={<Loader />}>
//             <Routes>
//               {/* ========= Public & Common ========= */}
//               <Route index element={<Home />} />
//               <Route path="/discover" element={<Discover />} />
//               <Route path="/courses" element={<Courses />} />
//               <Route path="/courses/:id" element={<CourseDetail />} />

//               <Route path="/exam" element={<Study4TestLibrary />} />
//               <Route path="/exam/:id" element={<ExamDetail />} />

//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               <Route path="/blog" element={<Blog />} />
//               <Route path="/blog/:id" element={<BlogDetail />} />

//               <Route path="/about" element={<About />} />
//               <Route path="/membership" element={<Membership />} />
//               <Route path="/payment" element={<Payment />} />

//               {/* Trang test nội bộ (menu tổng hợp) */}
//               <Route path="/test" element={<Menut />} />

//               {/* Một số trang public bổ sung (nếu bạn cần giữ) */}
//               <Route path="/discussion" element={<Discussion />} />
//               <Route path="/discussion/:id" element={<DiscussionDetail />} />
//               <Route path="/class/:id" element={<ClassRoom />} />
//               <Route path="/schedule" element={<SchedulePage />} />

//               {/* ========= Student namespace: /s/* ========= */}
//               <Route element={<RequireRole allow={["student"]} />}>
//                 <Route path="/s">
//                   <Route index element={<Navigate to="/s/dashboard" replace />} />
//                   <Route path="dashboard" element={<S_Dashboard />} />
//                   <Route path="enrollments" element={<S_Enrollments />} />
//                   <Route path="learning/:courseId" element={<S_Learning />} />
//                   <Route path="lesson/:lessonId" element={<S_LessonDetail />} />
//                   <Route
//                     path="enrollments/:courseId/cancel-request"
//                     element={<S_CancelEnroll />}
//                   />
//                   <Route path="historytest" element={<S_HistoryTest />} />
//                   <Route path="exam" element={<S_ExamList />} />
//                   <Route path="exam/:id" element={<S_ExamIntro />} />
//                   <Route path="exam/:id/take/:attemptId" element={<S_TakeExam />} />
//                   <Route path="results/:attemptId" element={<S_ResultDetail />} />
//                   <Route path="resultstest" element={<S_ResultsAgg />} />
//                   <Route path="profile" element={<S_Profile />} />
//                 </Route>
//               </Route>

//               {/* ========= Instructor namespace: /i/* ========= */}
//               <Route element={<RequireRole allow={["instructor"]} />}>
//                 <Route path="/i">
//                   <Route index element={<Navigate to="/i/dashboard" replace />} />
//                   <Route path="dashboard" element={<I_Dashboard />} />

//                   <Route path="courses" element={<I_Courses />} />
//                   <Route path="courses/new" element={<I_CourseNew />} />
//                   <Route path="courses/:id/edit" element={<I_CourseEdit />} />
//                   <Route path="courses/:id/lessons" element={<I_CourseLessons />} />
//                   <Route path="courses/:id/students" element={<I_CourseStudents />} />
//                   <Route
//                     path="courses/:id/students/:userId"
//                     element={<I_CourseStudentDetail />}
//                   />
//                   <Route path="courses/:id/reviews" element={<I_CourseReviews />} />

//                   <Route path="exams" element={<I_Exams />} />
//                   <Route path="exams/new" element={<I_ExamNew />} />
//                   <Route path="exams/:id/edit" element={<I_ExamEdit />} />
//                   <Route path="exams/:id/stats" element={<I_ExamStats />} />
//                   <Route path="exams/:id/attempts" element={<I_ExamAttempts />} />
//                 </Route>
//               </Route>

//               {/* ========= Auth-only gate (nếu có route yêu cầu login nhưng không cần phân role) ========= */}
//               <Route element={<RequireAuth />}>
//                 {/* Ví dụ: nếu bạn có /settings dùng chung cho mọi role, đặt ở đây */}
//               </Route>

//               {/* ========= Fallback ========= */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </Suspense>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// /* ---------------- Minor components ---------------- */
// function NotFound() {
//   return (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
//       <h1 className="text-3xl font-semibold text-slate-800">404 – Không tìm thấy trang</h1>
//       <p className="text-slate-500 mt-2">Đường dẫn có thể đã thay đổi hoặc không tồn tại.</p>
//       <a href="/" className="mt-6 inline-flex items-center rounded-lg px-4 py-2 border hover:bg-slate-50">
//         Về trang chủ
//       </a>
//     </div>
//   );
// }













// "use client";

// import { Suspense, lazy, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuth } from "./store/auth";
// import Menu from "./pages/shared/MenuS.jsx";

// /* ====== Các trang bạn ĐÃ có file (giữ nguyên path import của bạn) ====== */
// const Home = lazy(() => import("./pages/shared/Home.jsx"));
// const Discover = lazy(() => import("./pages/shared/Discover.jsx"));
// const Courses = lazy(() => import("./pages/shared/Courses.jsx"));
// const CourseDetail = lazy(() => import("./pages/shared/CourseDetail.jsx"));

// const Study4TestLibrary = lazy(() => import("./pages/shared/Exam.jsx")); // /exam (thư viện đề)
// const ExamDetail = lazy(() => import("./pages/shared/ExamDetail.jsx"));        // /exam/:id (giới thiệu đề thi)

// const Blog = lazy(() => import("./pages/shared/Blog.jsx"));
// const BlogDetail = lazy(() => import("./pages/shared/BlogDetail.jsx"));
// const About = lazy(() => import("./pages/shared/About.jsx"));
// const Membership = lazy(() => import("./pages/shared/MemberShip.jsx"));
// const Payment = lazy(() => import("./pages/shared/Payment.jsx"));
// const Menut = lazy(() => import("./pages/shared/Menut.jsx"));            // /test (menu nội bộ)

// const Login = lazy(() => import("./pages/shared/Login.jsx"));
// const Register = lazy(() => import("./pages/shared/Register.jsx"));

// const Discussion = lazy(() => import("./pages/Discussion.jsx"));
// const DiscussionDetail = lazy(() => import("./pages/DiscussionDetail.jsx"));
// const ClassRoom = lazy(() => import("./pages/ClassRoom.jsx"));


// const Dashboard = lazy(() => import("./pages/student/DashBoard.jsx"));    // dùng cho /s/dashboard
// const HistoryTest = lazy(() => import("./pages/student/HistoryTest.jsx")); // /s/historytest
// const IELTSResultsPage = lazy(() => import("./pages/student/ResultTest.jsx")); // /s/resultstest
// const QuizTest = lazy(() => import("./pages/student/QuizTest.jsx"));      // /s/exam/:id/take/:attemptId
// const Learning = lazy(() => import("./pages/student/Learning.jsx"));      // tái dùng cho /s/learning/:courseId
// const Enrollments = lazy(() => import("./pages/student/Enrollments.jsx"));
// const LessonDetail = lazy(() => import("./pages/student/LessonDetail.jsx"));
// const ResultAttempt = lazy(() => import("./pages/student/ResultAttempt.jsx"));
// const ProfilePage = lazy(() => import("./pages/student/Profile.jsx"));
// const SchedulePage = lazy(() => import("./pages/student/SchedulePage.jsx"));




// const InstructorDashboard = lazy(() => import("./pages/instructor/Dashboard.jsx"));
// const InstructorCourses = lazy(() => import("./pages/instructor/Courses.jsx"));
// const CourseLessons = lazy(() => import("./pages/instructor/CourseLessons.jsx"));
// const Exams = lazy(() => import("./pages/instructor/Exams.jsx"));
// const CourseNew = lazy(() => import("./pages/instructor/CourseNew.jsx"));
// const CourseEdit = lazy(() => import("./pages/instructor/CourseEdit.jsx"));
// const CourseStudents = lazy(() => import("./pages/instructor/CourseStudents.jsx"));
// const StudentProgress = lazy(() => import("./pages/instructor/StudentProgress.jsx"));
// const CourseReviews = lazy(() => import("./pages/instructor/CourseReviews.jsx"));
// const ExamNew = lazy(() => import("./pages/instructor/ExamNew.jsx"));
// const ExamEdit = lazy(() => import("./pages/instructor/ExamEdit.jsx"));
// const ExamStats = lazy(() => import("./pages/instructor/ExamStats.jsx"));
// const ExamAttempts = lazy(() => import("./pages/instructor/ExamAttempts.jsx"));


// /* ====== Placeholder cho các trang CHƯA có file riêng ====== */
// function Placeholder({ title }) {
//   return (
//     <div className="min-h-[60vh] w-full flex flex-col items-center justify-center text-center">
//       <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
//       <p className="text-slate-500 mt-2">
//         Trang này là placeholder. Tạo file page tương ứng và cập nhật route khi sẵn sàng.
//       </p>
//     </div>
//   );
// }

// /* ====== Loader đơn giản ====== */
// function Loader() {
//   return (
//     <div className="min-h-[40vh] w-full flex items-center justify-center text-slate-500">
//       Đang tải…
//     </div>
//   );
// }

// /* ====== NotFound ====== */
// function NotFound() {
//   return (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
//       <h1 className="text-3xl font-semibold text-slate-800">404 – Không tìm thấy trang</h1>
//       <a href="/" className="mt-6 inline-flex items-center rounded-lg px-4 py-2 border hover:bg-slate-50">
//         Về trang chủ
//       </a>
//     </div>
//   );
// }

// /* ====== App ====== */
// export default function App() {
//   const { hydrate } = useAuth(); // giữ nguyên nếu bạn cần khởi tạo store (không liên quan guard)
//   useEffect(() => { hydrate(); }, [hydrate]);

//   return (
//     <BrowserRouter>
//       {/* Fullscreen, edge-to-edge */}
//       <div className="min-h-screen w-screen bg-white flex flex-col">
//         <main className="flex-1">
//           <Suspense fallback={<Loader />}>
//             <Routes>
//               {/** ---------- PUBLIC & BOTH ---------- */}
//               <Route index element={<Home />} />
//               <Route path="/menut" element={<Menut />} />
//               <Route path="/menuS" element={<Menu />} />
//               <Route path="/discover" element={<Discover />} />

//               <Route path="/courses" element={<Courses />} />
//               <Route path="/courses/:id" element={<CourseDetail />} />

//               <Route path="/exam" element={<Study4TestLibrary />} />
//               <Route path="/exam/:id" element={<ExamDetail />} />

//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               <Route path="/blog" element={<Blog />} />
//               <Route path="/blog/:id" element={<BlogDetail />} />

//               <Route path="/about" element={<About />} />
//               <Route path="/membership" element={<Membership />} />
//               <Route path="/payment" element={<Payment />} />

//               <Route path="/test" element={<Menut />} /> {/* Page Test Menu nội bộ */}

//               {/** (Tuỳ chọn) các trang public bổ sung */}
//               <Route path="/discussion" element={<Discussion />} />
//               <Route path="/discussion/:id" element={<DiscussionDetail />} />
//               <Route path="/class/:id" element={<ClassRoom />} />
//               <Route path="/schedule" element={<SchedulePage />} />

//               {/** ---------- STUDENT /s/* (CHỈ ROUTING, KHÔNG GUARD) ---------- */}
//               <Route path="/s/dashboard" element={<Dashboard />} />
//               <Route
//                 path="/s/enrollments"
//                 element={<Enrollments title="📚 /s/enrollments — Khóa học của tôi" />}
//               />
//               <Route
//                 path="/s/learning/:courseId"
//                 element={<Learning />}
//               />
//               <Route
//                 path="/s/lesson/:lessonId"
//                 element={<LessonDetail title="📖 /s/lesson/:lessonId — Chi tiết bài học" />}
//               />
//               <Route path="/s/schedulepage" element={<SchedulePage />} />
//               <Route path="/s/historytest" element={<HistoryTest />} />
//               <Route
//                 path="/s/exam/:id"
//                 element={<ExamDetail title="🧠 /s/exam/:id — Giới thiệu đề thi (CTA Bắt đầu thi)" />}
//               />
//               <Route
//                 path="/s/exam/:id/take/:attemptId"
//                 element={<QuizTest />}
//               />

//               <Route
//                 path="/s/results/:attemptId"
//                 element={<ResultAttempt title="📈 /s/results/:attemptId — Kết quả bài thi" />}
//               />
//               <Route path="/s/resultstest" element={<IELTSResultsPage />} />
//               <Route
//                 path="/s/profile"
//                 element={<ProfilePage title="👤 /s/profile — Hồ sơ & cài đặt" />}
//               />

//               {/** ---------- INSTRUCTOR /i/* (CHỈ ROUTING, KHÔNG GUARD) ---------- */}
//               <Route
//                 path="/i/dashboard"
//                 element={<InstructorDashboard title="📊 /i/dashboard — Tổng quan giảng viên" />}
//               />
//               <Route
//                 path="/i/courses"
//                 element={<InstructorCourses title="📚 /i/courses — Khoá học đã tạo" />}
//               />
//               <Route
//                 path="/i/courses/new"
//                 element={<CourseNew title="🆕 /i/courses/new — Tạo khoá draft" />}
//               />
//               <Route
//                 path="/i/courses/:id/edit"
//                 element={<CourseEdit title="✏️ /i/courses/:id/edit — Sửa khoá (draft/version)" />}
//               />
//               <Route
//                 path="/i/courses/:id/lessons"
//                 element={<CourseLessons title="🧱 /i/courses/:id/lessons — CRUD bài học" />}
//               />
//               <Route
//                 path="/i/courses/:id/students"
//                 element={<CourseStudents title="👥 /i/courses/:id/students — Danh sách học viên" />}
//               />
//               <Route
//                 path="/i/courses/:id/students/:userId"
//                 element={<StudentProgress title="👤 /i/courses/:id/students/:userId — Tiến độ 1 học viên" />}
//               />
//               <Route
//                 path="/i/courses/:id/reviews"
//                 element={<CourseReviews title="⭐ /i/courses/:id/reviews — Quản lý đánh giá" />}
//               />

//               <Route
//                 path="/i/exams"
//                 element={<Exams title="🧠 /i/exams — Đề thi do GV tạo" />}
//               />
//               <Route
//                 path="/i/exams/new"
//                 element={<ExamNew title="🆕 /i/exams/new — Tạo đề thi (builder + ngân hàng câu hỏi)" />}
//               />
//               <Route
//                 path="/i/exams/:id/edit"
//                 element={<ExamEdit title="✏️ /i/exams/:id/edit — Chỉnh sửa đề (draft)" />}
//               />
//               <Route
//                 path="/i/exams/:id/stats"
//                 element={<ExamStats title="📈 /i/exams/:id/stats — Thống kê đề thi (Item analysis)" />}
//               />
//               <Route
//                 path="/i/exams/:id/attempts"
//                 element={<ExamAttempts title="🧾 /i/exams/:id/attempts — Lượt làm & chi tiết" />}
//               />


//               {/** ---------- LEGACY/COMPAT ROUTE (nếu bạn đang dùng) ---------- */}
//               <Route path="/exam/:id/start/:attemptId" element={<QuizTest />} />
//               {/** ---------- 404 ---------- */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </Suspense>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }






















"use client";

import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./store/auth";
import Menu from "./pages/shared/MenuS.jsx";

/* ====== Các trang hiện có ====== */
const Home = lazy(() => import("./pages/shared/Home.jsx"));
const Discover = lazy(() => import("./pages/shared/Discover.jsx"));
const Courses = lazy(() => import("./pages/shared/Courses/Courses.jsx"));
const CourseDetail = lazy(() => import("./pages/shared/CourseDetail/CourseDetail.jsx"));

const Study4TestLibrary = lazy(() => import("./pages/shared/Exam.jsx"));
const ExamDetail = lazy(() => import("./pages/shared/ExamDetail.jsx"));

/* ====== Blog routes (mới) ====== */
const Blog = lazy(() => import("./pages/shared/Blog.jsx"));
const BlogDetail = lazy(() => import("./pages/shared/BlogDetail.jsx"));
const BlogSearch = lazy(() => import("./pages/shared/BlogSearch.jsx"));     // /blog/search
const BlogAuthor = lazy(() => import("./pages/shared/BlogAuthor.jsx"));    // /blog/author/:memberId
const BlogMy = lazy(() => import("./pages/shared/BlogMy.jsx"));             // /blog/my
const BlogEditor = lazy(() => import("./pages/shared/BlogEditor.jsx"));     // /blog/new, /blog/:id/edit
// const Blog = lazy(() => import("./pages/shared/Blog.jsx"));
// const BlogDetail = lazy(() => import("./pages/shared/BlogDetail.jsx"));



const About = lazy(() => import("./pages/shared/About.jsx"));
const Membership = lazy(() => import("./pages/shared/MemberShip.jsx"));
const Payment = lazy(() => import("./pages/shared/Payment.jsx"));
const Menut = lazy(() => import("./pages/shared/Menut.jsx"));

const Login = lazy(() => import("./pages/shared/Login.jsx"));
const Register = lazy(() => import("./pages/shared/Register.jsx"));

const Discussion = lazy(() => import("./pages/Discussion.jsx"));
const DiscussionDetail = lazy(() => import("./pages/DiscussionDetail.jsx"));
const ClassRoom = lazy(() => import("./pages/ClassRoom.jsx"));

const Dashboard = lazy(() => import("./pages/student/DashBoard.jsx"));
const HistoryTest = lazy(() => import("./pages/student/HistoryTest.jsx"));
const IELTSResultsPage = lazy(() => import("./pages/student/ResultTest.jsx"));
const QuizTest = lazy(() => import("./pages/student/QuizTest.jsx"));
const Learning = lazy(() => import("./pages/student/Learning.jsx"));
const Enrollments = lazy(() => import("./pages/student/Enrollments.jsx"));
const LessonDetail = lazy(() => import("./pages/student/LessonDetail.jsx"));
const ResultAttempt = lazy(() => import("./pages/student/ResultAttempt.jsx"));
const ProfilePage = lazy(() => import("./pages/student/Profile.jsx"));
const SchedulePage = lazy(() => import("./pages/student/SchedulePage.jsx"));

const InstructorDashboard = lazy(() => import("./pages/instructor/Dashboard.jsx"));
const InstructorCourses = lazy(() => import("./pages/instructor/Courses.jsx"));
const CourseLessons = lazy(() => import("./pages/instructor/CourseLessons.jsx"));
const Exams = lazy(() => import("./pages/instructor/Exams.jsx"));
const CourseNew = lazy(() => import("./pages/instructor/CourseNew.jsx"));
const CourseEdit = lazy(() => import("./pages/instructor/CourseEdit.jsx"));
const CourseStudents = lazy(() => import("./pages/instructor/CourseStudents.jsx"));
const StudentProgress = lazy(() => import("./pages/instructor/StudentProgress.jsx"));
const CourseReviews = lazy(() => import("./pages/instructor/CourseReviews.jsx"));
const ExamNew = lazy(() => import("./pages/instructor/ExamNew.jsx"));
const ExamEdit = lazy(() => import("./pages/instructor/ExamEdit.jsx"));
const ExamStats = lazy(() => import("./pages/instructor/ExamStats.jsx"));
const ExamAttempts = lazy(() => import("./pages/instructor/ExamAttempts.jsx"));



const ForumHome = lazy(() => import("./pages/shared/ForumHome.jsx"));
const QuestionDetail = lazy(() => import("./pages/shared/QuestionDetail.jsx"));
const AskQuestion = lazy(() => import("./pages/shared/AskQuestion.jsx"));
const EditQuestion = lazy(() => import("./pages/shared/EditQuestion.jsx"));
const MyQuestions = lazy(() => import("./pages/shared/MyQuestions.jsx"));


const BecomeInstructor = lazy(() => import("./pages/shared/BecomInstructor.jsx")  )



/** ====== Instructor pages ====== */

import LessonEdit from "./pages/instructor/LessonEditor.jsx";
import LessonPreview from "./pages/instructor/LessonPreview.jsx";
import LessonUpload from "./pages/instructor/LessonUpload.jsx";

import Categories from "./pages/instructor/Categories.jsx";
import CategoryCreate from "./pages/instructor/CategoryCreate.jsx";



















function Placeholder({ title }) {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
      <p className="text-slate-500 mt-2">Trang này là placeholder. Tạo file page tương ứng và cập nhật route khi sẵn sàng.</p>
    </div>
  );
}

function Loader() {
  return (
    <div className="min-h-[40vh] w-full flex items-center justify-center text-slate-500">
      Đang tải…
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold text-slate-800">404 – Không tìm thấy trang</h1>
      <a href="/" className="mt-6 inline-flex items-center rounded-lg px-4 py-2 border hover:bg-slate-50">
        Về trang chủ
      </a>
    </div>
  );
}

export default function App() {
  const { hydrate } = useAuth();
  useEffect(() => { hydrate(); }, [hydrate]);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen bg-white flex flex-col">
        <main className="flex-1">
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* ---------- PUBLIC ---------- */}
              <Route index element={<Home />} />
              <Route path="/menut" element={<Menut />} />
              <Route path="/menuS" element={<Menu />} />
              <Route path="/discover" element={<Discover />} />

              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />

              <Route path="/exam" element={<Study4TestLibrary />} />
              <Route path="/exam/:id" element={<ExamDetail />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />



              <Route path="/forum" element={<ForumHome />} />
              <Route path="/forum/new" element={<AskQuestion />} />
              <Route path="/forum/:id" element={<QuestionDetail />} />
              <Route path="/forum/:id/edit" element={<EditQuestion />} />
              <Route path="/forum/my" element={<MyQuestions />} />




              {/* ---------- BLOG ROUTES (thứ tự quan trọng) ---------- */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/search" element={<BlogSearch />} />
              <Route path="/blog/author/:memberId" element={<BlogAuthor />} />
              <Route path="/blog/my" element={<BlogMy />} />                 
              <Route path="/blog/new" element={<BlogEditor mode="create" />} />    {/* yêu cầu đăng nhập */}
              <Route path="/blog/:id/edit" element={<BlogEditor mode="edit" />} /> {/* yêu cầu đăng nhập */}
              <Route path="/blog/:id" element={<BlogDetail />} />            {/* đặt CUỐI cùng */}

              <Route path="/about" element={<About />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/payment" element={<Payment />} />

              <Route path="/discussion" element={<Discussion />} />
              <Route path="/discussion/:id" element={<DiscussionDetail />} />
              <Route path="/class/:id" element={<ClassRoom />} />
              <Route path="/schedule" element={<SchedulePage />} />

              {/* ---------- STUDENT (/s/*) ---------- */}
              <Route path="/s/dashboard" element={<Dashboard />} />
              <Route path="/s/enrollments" element={<Enrollments title="📚 /s/enrollments — Khóa học của tôi" />} />
              <Route path="/s/learning/:courseId" element={<Learning />} />
              <Route path="/s/lesson/:lessonId" element={<LessonDetail title="📖 /s/lesson/:lessonId — Chi tiết bài học" />} />
              <Route path="/s/lesson/:courseId/:lessonId" element={<LessonDetail title="📖 /s/lesson/:lessonId — Chi tiết bài học" />} />
              <Route path="/s/schedulepage" element={<SchedulePage />} />
              <Route path="/s/historytest" element={<HistoryTest />} />
              <Route path="/s/exam/:id" element={<ExamDetail title="🧠 /s/exam/:id — Giới thiệu đề thi (CTA Bắt đầu thi)" />} />
              <Route path="/s/exam/:id/take/:attemptId" element={<QuizTest />} />
              <Route path="/s/results/:attemptId" element={<ResultAttempt title="📈 /s/results/:attemptId — Kết quả bài thi" />} />
              <Route path="/s/resultstest" element={<IELTSResultsPage />} />
              <Route path="/s/profile" element={<ProfilePage title="👤 /s/profile — Hồ sơ & cài đặt" />} />

              {/* ---------- INSTRUCTOR (/i/*) ---------- */}
              <Route path="/i/dashboard" element={<InstructorDashboard title="📊 /i/dashboard — Tổng quan giảng viên" />} />
              <Route path="/i/courses" element={<InstructorCourses title="📚 /i/courses — Khoá học đã tạo" />} />
              <Route path="/i/courses/new" element={<CourseNew title="🆕 /i/courses/new — Tạo khoá draft" />} />
              <Route path="/i/courses/:id/edit" element={<CourseEdit title="✏️ /i/courses/:id/edit — Sửa khoá (draft/version)" />} />
              <Route path="/i/courses/:id/lessons" element={<CourseLessons title="🧱 /i/courses/:id/lessons — CRUD bài học" />} />
              <Route path="/i/courses/:id/students" element={<CourseStudents title="👥 /i/courses/:id/students — Danh sách học viên" />} />
              <Route path="/i/courses/:id/students/:userId" element={<StudentProgress title="👤 /i/courses/:id/students/:userId — Tiến độ 1 học viên" />} />
              <Route path="/i/courses/:id/reviews" element={<CourseReviews title="⭐ /i/courses/:id/reviews — Quản lý đánh giá" />} />
              <Route path="/i/exams" element={<Exams title="🧠 /i/exams — Đề thi do GV tạo" />} />
              <Route path="/i/exams/new" element={<ExamNew title="🆕 /i/exams/new — Tạo đề thi (builder + ngân hàng câu hỏi)" />} />
              <Route path="/i/exams/:id/edit" element={<ExamEdit title="✏️ /i/exams/:id/edit — Chỉnh sửa đề (draft)" />} />
              <Route path="/i/exams/:id/stats" element={<ExamStats title="📈 /i/exams/:id/stats — Thống kê đề thi (Item analysis)" />} />
              <Route path="/i/exams/:id/attempts" element={<ExamAttempts title="🧾 /i/exams/:id/attempts — Lượt làm & chi tiết" />} />
              <Route path="/i/become-instructor" element={<BecomeInstructor title="🧾 /i/exams/:id/attempts — Lượt làm & chi tiết" />} />





            <Route
                    path="/i/courses/:courseId/lessons/:lessonId/edit"
                    element={<LessonEdit />}
            />
            <Route
                      path="/i/courses/:courseId/lessons/:lessonId/edit"
                      element={<LessonEdit />}
            />
            <Route
                      path="/i/courses/:courseId/lessons/:lessonId/preview"
                      element={<LessonPreview />}
            />
            <Route
                      path="/i/courses/:courseId/lessons/:lessonId/upload"
                      element={<LessonUpload />}
            />
            <Route path="/i/categories" element={<Categories />} />
            <Route path="/i/categories/new" element={<CategoryCreate />} />




              {/* ---------- Legacy route cho QuizTest ---------- */}
              <Route path="/exam/:id/start/:attemptId" element={<QuizTest />} />

              {/* ---------- 404 ---------- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

