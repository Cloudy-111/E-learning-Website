import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";   // <-- thêm
import ClassRoom from "./pages/ClassRoom.jsx";         // <-- thêm
import Discussion from "./pages/Discussion.jsx";       // <-- thêm
import Login from "./pages/Login.jsx";                 // <-- thêm
import Register from "./pages/Register.jsx";           // <-- thêm
import Blog from "./pages/Blog.jsx";
import Study4Homepage from "./pages/test.jsx";
// import Study4About from "./pages/test.jsx";
// import Study4Courses from "./pages/test.jsx";
// import Study4CourseDetail from "./pages/test.jsx";
// import Study4Learning from "./pages/test.jsx";
// import IELTSListeningTest from "./pages/test.jsx";
import IELTSResultsPage from "./pages/test.jsx";
import About from "./pages/About.jsx";
import Membership from "./pages/MemberShip.jsx";
import Study4TestLibrary from "./pages/Exam.jsx";
import Payment from "./pages/Payment.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import { useEffect } from "react";
import { useAuth } from "./store/auth";

// import Header from "./components/Header";         // <— thêm

export default function App() {
  const { hydrate, user, logout } = useAuth();

  useEffect(() => { hydrate(); }, [hydrate]);

  return (
    <BrowserRouter>
      {/* container full màn */}
      <div className="min-h-screen bg-white flex flex-col">

        {/* phần nội dung chiếm hết chiều cao còn lại */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/class/:id" element={<ClassRoom />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exam" element={<Study4TestLibrary />} />
            <Route path="/test" element={<IELTSResultsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
