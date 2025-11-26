// src/pages/shared/CourseDetail.jsx
"use client";

import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Section from "../../../components/Section";
import Hero from "./Component/Hero";
import ListLesson from "./Component/ListLesson";
import ListReview from "./Component/ListReview";

import { fetchCourseDetail } from "../../../api/courses.api";
import { fetchCourseContent } from "../../../api/courseContent.api";
import { fetchListLessons } from "../../../api/lessons.api";
import { fetchCourseReviews, hasReviewedCourse } from "../../../api/courseReview.api";
import { isEnrolled } from "../../../api/enrollments.api";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Check Enrollment
  const { data: enrollmentData } = useQuery({
    queryKey: ['enrollment', id],
    queryFn: async () => {
      try {
        const res = await isEnrolled(id);
        return res.data.isEnrolled;
      } catch {
        return false;
      }
    },
    enabled: !!id,
  });
  const isEnrolledState = enrollmentData ?? false;

  // 2. Check Reviewed
  const { data: reviewedData } = useQuery({
    queryKey: ['hasReviewed', id],
    queryFn: async () => {
      try {
        const res = await hasReviewedCourse(id);
        return res.data.hasReviewed;
      } catch {
        return false;
      }
    },
    enabled: !!id,
  });
  const hasReviewed = reviewedData ?? false;

  // 3. Fetch Course Detail
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError
  } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await fetchCourseDetail(id);
      return res.data;
    },
    enabled: !!id,
  });

  // 4. Fetch Course Content (Intro)
  const {
    data: intro,
    isLoading: introLoading
  } = useQuery({
    queryKey: ['courseContent', id],
    queryFn: async () => {
      const res = await fetchCourseContent(id);
      return res.data;
    },
    enabled: !!id,
  });

  const courseContentId = intro?.id;

  // 5. Fetch List Lessons (Dependent on courseContentId)
  const {
    data: listLessonData,
    isLoading: lessonLoading
  } = useQuery({
    queryKey: ['lessons', courseContentId],
    queryFn: async () => {
      const res = await fetchListLessons(courseContentId);
      return res.data;
    },
    enabled: !!courseContentId,
  });
  const listLesson = listLessonData || [];

  // 6. Fetch Reviews
  const {
    data: listReviewData,
    isLoading: reviewLoading
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await fetchCourseReviews(id);
      return res.data;
    },
    enabled: !!id,
  });
  const listReview = listReviewData || [];

  const loading = courseLoading || introLoading || lessonLoading || reviewLoading;
  const error = courseError ? "Không tải được thông tin khóa học. Vui lòng thử lại." : "";

  const content = useMemo(() => {
    if (loading && !course) {
      return (
        <Section>
          <div className="px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="aspect-video rounded-2xl border bg-slate-100 animate-pulse" />
                <div className="h-6 w-2/3 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-[280px] rounded-2xl border bg-slate-100 animate-pulse" />
              </div>
            </div>
          </div>
        </Section>
      );
    }
    if (error) {
      return (
        <Section>
          <div className="px-6 lg:px-12">
            <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 p-4">{error}</div>
            <div className="mt-4">
              <button
                className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </button>
            </div>
          </div>
        </Section>
      );
    }
    if (!course) return null;

    return (
      <>
        <Hero course={course} isEnrolledState={isEnrolledState} />
        {intro && (
          <Section id="intro" title="Giới thiệu khóa học">
            <div className="lg:col-span-2 rounded-2xl border p-6 bg-white">
              <p className="text-slate-700 whitespace-pre-line">{intro.introduce || "Chưa có nội dung mô tả."}</p>
            </div>
          </Section>
        )}
        <Section id="lessons" title="Danh sách bài học">
          <ListLesson
            isEnrolledState={isEnrolledState}
            listLesson={listLesson}
            courseContentId={courseContentId}
            courseId={id}
          />
        </Section>
        <Section id="reviews" title="Đánh giá khóa học">
          <ListReview
            hasReviewed={hasReviewed}
            isEnrolledState={isEnrolledState}
            listReview={listReview}
            courseId={id}
          />
        </Section>
      </>
    );
  }, [loading, error, course, intro, isEnrolledState, listLesson, courseContentId, id, listReview, hasReviewed, navigate]);

  return (
    <>
      {content}
    </>
  );
}

export default CourseDetail;