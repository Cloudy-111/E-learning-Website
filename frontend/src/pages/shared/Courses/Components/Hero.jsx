import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HistoryCard from "./HistoryCard";
import { fetchEnrollmentsByStudentId } from "../../../../api/enrollments.api";
import { useAuth } from "../../../../store/auth";

function Hero() {
  const { user } = useAuth();

  // Fetch student enrollments
  const { data: enrollmentData } = useQuery({
    queryKey: ["student-enrollments-hero", user?.id],
    queryFn: () => fetchEnrollmentsByStudentId({ pageSize: 5, page: 1 }),
    enabled: !!user, // only fetch if user is logged in
  });

  // The API response structure usually contains a list in data.data or similar. 
  // We need to adapt it to the format HistoryCard expects: { id, title, teacher, progress }
  // Assuming the API returns: { items: [...] } or just [...]
  // You might need to adjust 'enrolledCourses' based on actual API response debug.
  // Common pattern in this project seems to be response.data
  const recentCourses = enrollmentData?.data?.items || [];

  return (
    <section className="w-screen overflow-x-hidden pt-8">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-14">
        {/* LEFT illustration */}
        <div className="order-2 lg:order-1">
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-blue-100 via-indigo-100 to-sky-100 border grid place-items-center">
            <img 
              src="https://images.pexels.com/photos/35391833/pexels-photo-35391833.jpeg" 
              alt="Learning Illustration" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT text + history */}
        <div className="order-1 lg:order-2">
          <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
            P Elearning • Học tập không giới hạn
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl text-slate-900">
            Chào mừng bạn quay lại! Sẵn sàng cho bài học tiếp theo?
          </h1>
          <p className="text-slate-600 mt-3">
            Hãy chọn ngay khóa học yêu thích từ các chủ đề hàng đầu.
          </p>

          {/* <div className="mt-5 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-700">Lịch sử học gần đây</div>
            <Link to="/s/enrollments" className="text-sm text-[#2563eb] hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {HISTORY.map((h) => (
              <HistoryCard key={h.id} item={h} />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;