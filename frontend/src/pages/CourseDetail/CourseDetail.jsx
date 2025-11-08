// src/pages/CourseDetail.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hero from "./Components/Hero";
import EverythingBanner from "./Components/EverythingBanner";
import MarketingArticles from "./Components/MarketingArticles";
import ForInstructors from "./Components/ForInstructors";
import TopOffers from "./Components/TopOffers";

function CourseDetail(){
  const { id } = useParams(); // assuming route is /courses/:id
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const base = "http://localhost:5102";
        const res = await fetch(`${base}/api/courses/${encodeURIComponent(id)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw body?.message || `Lỗi: ${res.status}`;
        }
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setError(typeof err === "string" ? err : (err?.message || "Lỗi khi gọi API"));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (error) return <div className="p-6 text-red-600">Lỗi: {error}</div>;
  if (!course) return <div className="p-6">Không tìm thấy khóa học</div>;

  return (
    <>
      <Header />
      <Hero course={course}/>
      <EverythingBanner />
      <MarketingArticles />
      <ForInstructors />
      <TopOffers />
      <Footer />
    </>
  );
}

export default CourseDetail;
