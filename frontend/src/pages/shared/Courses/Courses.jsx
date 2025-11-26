// src/pages/shared/Courses.jsx
"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../../components/Layout";
import Hero from "./Components/Hero";
import SearchBar from "./Components/SearchBar";
import ListResult from "./Components/ListResult";
import Error from "./Components/Error";
import Pagination from "../../../components/Pagination";

import { fetchCourses } from "../../../api/courses.api";
import { getCategories } from "../../../api/categories.api";
import { isLoggedIn } from "../../../utils/auth";

function Courses() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Categories
  const {
    data: categoriesData,
    isLoading: cateLoading,
    error: cateError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories();
      return res.data ?? [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const categories = categoriesData || [];

  // Fetch Courses
  const {
    data: coursesData,
    isLoading: loading,
    error: coursesError
  } = useQuery({
    queryKey: ['courses', { keyword: query, category: selectedCategory, page: currentPage }],
    queryFn: async () => {
      const res = await fetchCourses({ keyword: query, category: selectedCategory, page: currentPage });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const courses = Array.isArray(coursesData?.courses) ? coursesData.courses : [];
  const totalPages = coursesData?.totalPages || 1;

  const visibleCourses = useMemo(() => courses, [courses]);

  const handleSearch = () => {
    setCurrentPage(1);
    // React Query will automatically refetch because the queryKey dependencies (query, selectedCategory) will change
    // But since we are using state for query/selectedCategory, we might need to debounce or just let the user click search
    // In this UI, SearchBar seems to control when search happens.
    // If SearchBar updates the state passed to useQuery, it triggers refetch.
  };

  // Error handling
  const error = coursesError ? "Không thể tải danh sách khóa học. Vui lòng thử lại sau." : "";
  const categoryErrorMsg = cateError ? (typeof cateError === "string" ? cateError : cateError?.message || "Không thể tải danh mục") : "";

  if (cateLoading) return <div>Đang tải danh mục...</div>;
  if (categoryErrorMsg) return <div className="text-red-600">{categoryErrorMsg}</div>;

  return (
    <>
      {isLoggedIn() && <Hero />}

      <SearchBar
        query={query}
        setQuery={setQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        handleSearch={handleSearch}
      />

      <Error error={error} />

      <ListResult visibleCourses={visibleCourses} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default Courses;