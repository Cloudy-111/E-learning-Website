import { Check, Clock, Eye } from "../../../../assets/Icons";
import { Ghost } from "../../../../components/Buttons";
import EnrollButton from "./EnrollButton";

import fallbackImage from "../../../../assets/images/fallback-image.jpeg";
import Image from "../../../../components/ui/Image";

function Hero({ course, isEnrolledState }) {
  const {
    title,
    description,
    teacherName,
    thumbnailUrl,
    averageRating,
    reviewCount,
    categoryName,
    status,
    createdAt,
    updatedAt,
    price,
    discountPrice,
  } = course || {};

  const hasDiscount = typeof discountPrice === "number" && discountPrice > 0 && discountPrice < price;
  const finalPrice = hasDiscount ? discountPrice : price;

  return (
    <section className="w-screen overflow-x-hidden bg-blue-50/50 py-10 lg:py-14">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Info */}
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-200 mb-6">
            <Image
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider">
              <span className="inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-blue-200 bg-blue-50">
                {categoryName || "Khóa học"} • {status || "published"}
              </span>
              <span className="inline-flex border rounded-full px-3 py-1 text-slate-600 border-slate-300">
                ⭐ {Number(averageRating || 0).toFixed(1)} / 5 • {reviewCount || 0} đánh giá
              </span>
              {updatedAt && (
                <span className="inline-flex border rounded-full px-3 py-1 text-slate-600 border-slate-300">
                  Cập nhật: {new Date(updatedAt).toLocaleDateString("vi-VN")}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl lg:text-4xl font-extrabold text-slate-900">{title}</h1>
            <p className="text-slate-700 mt-2 max-w-3xl">{description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1">
                <Eye /> {categoryName || "Chủ đề"}
              </span>
              <span>•</span>
              <span>
                Giảng viên: <span className="font-medium">{teacherName || "Đang cập nhật"}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock /> {createdAt ? new Date(createdAt).toLocaleDateString("vi-VN") : "Thời lượng: Đang cập nhật"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Enroll card */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-slate-900">
                {typeof finalPrice === "number" ? finalPrice.toLocaleString("vi-VN") : "0"}đ
              </div>
              {hasDiscount && (
                <div className="text-sm text-slate-500 line-through">
                  {price?.toLocaleString("vi-VN")}đ
                </div>
              )}
            </div>

            <EnrollButton courseId={course.id} isEnrolledState={isEnrolledState} />

            <Ghost className="w-full mt-2">Thêm vào yêu thích</Ghost>
            <div className="mt-5 grid gap-2 text-sm text-slate-700">
              <div className="flex items-start gap-2"><Check /><span>Truy cập trọn đời</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hỗ trợ hỏi đáp</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền trong 7 ngày</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;