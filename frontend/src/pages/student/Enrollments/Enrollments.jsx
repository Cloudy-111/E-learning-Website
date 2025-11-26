"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEnrollmentsByStudentId } from "../../../api/enrollments.api";

import Hero from "./Component/EnrollmentsBody/Hero";
import ListEnrollment from "./Component/EnrollmentsBody/ListEnrollment";
import Pagination from "../../../components/Pagination";
import Loading from "./Component/Loading";
import Error from "./Component/Error";

function Enrollments() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Enrollments
  const {
    data: enrollmentsData,
    isLoading: loading,
    error: enrollmentsError
  } = useQuery({
    queryKey: ['enrollments', { keyword: q, status, sort, page: currentPage }],
    queryFn: async () => {
      const res = await fetchEnrollmentsByStudentId({ keyword: q, status, sort, page: currentPage });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const enrollments = Array.isArray(enrollmentsData?.courses) ? enrollmentsData.courses : [];
  const totalPages = enrollmentsData?.totalPages || 1;

  const handleSearch = () => {
    setCurrentPage(1);
    // React Query handles refetching automatically when state changes
  };

  const error = enrollmentsError ? "Không tải được danh sách khóa học. Vui lòng thử lại sau." : "";

  return (
    <div className="">
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
      {loading ? <Loading />
        : error ? <Error error={error} />
          : (
            <main className="w-full px-6 lg:px-12 py-10">
              <ListEnrollment
                enrollmentList={enrollments}
              />

              {/* pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </main>
          )
      }

    </div>
  );
}

export default Enrollments;