"use client";

import { useEffect, useState } from "react";
import { fetchEnrollmentsByStudentId } from "../../../api/enrollments.api";

import Hero from "./Component/EnrollmentsBody/Hero";
import Layout from "../../../components/Layout";
import ListEnrollment from "./Component/EnrollmentsBody/ListEnrollment";
import Pagination from "../../../components/Pagination";
import Loading from "./Component/Loading";
import Error from "./Component/Error";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch enrollments
  async function loadEnrollments(params = {}) {
    try {
      setLoading(true);
      setError(""); 
      
      const resEnrollments = await fetchEnrollmentsByStudentId(params);
      
      const data = resEnrollments.data.courses;
      setEnrollments(Array.isArray(data) ? data : []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("Fetch enrollments error:", e);
        setError("Không tải được danh sách khóa học. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const ac = new AbortController();
    loadEnrollments();
    return () => ac.abort();
  }, []);

  const handleSearch = () => {
    loadEnrollments({ keyword: q, status: status });
  };

  /* =============== UI: loading / error =============== */
  if (loading) return <Loading />

  if (error) return <Error error={error} />

  return (
    <div className="min-h-screen w-screen bg-white">
      <Layout>
        <Hero 
          q={q} 
          setQ={setQ} 
          status={status} 
          setStatus={setStatus} 
          sort={sort} 
          setSort={setSort} 
          handleSearch={handleSearch}
        />

        {/* MAIN */}
        <main className="w-full px-6 lg:px-12 py-10">
          <ListEnrollment 
            enrollmentList={enrollments} 
          />

          {/* pagination */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => {loadEnrollments({keyword: q, status: status, page})}}/>
        </main>
      </Layout>
    </div>
  );
}

export default Enrollments;