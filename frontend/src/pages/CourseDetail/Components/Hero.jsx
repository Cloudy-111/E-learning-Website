/* ===== hero ===== */
function Hero(course) {
  console.log(course.course.title);
  return (
    <section className="w-screen overflow-x-hidden pt-8">
      
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: media + meta (2 cột) */}
        <div className="lg:col-span-2">
          {/* media */}
          <div className="rounded-2xl border bg-blue-50 aspect-video grid place-items-center">
            <img src={course.course.thumbnailUrl} alt={course.course.title} className="h-full object-cover rounded-2xl"/>
            <span className="text-blue-500 text-sm"></span>
          </div>

          {/* title + meta */}
          <div className="mt-5">
            <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
              Được đánh giá cao • 4 / 5
            </div>
            <h1 className="mt-3 text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900">
              {course.course.title}
            </h1>
            <p className="text-slate-700 mt-2 max-w-3xl">
              {course.course.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1">
                <Eye /> {Number(250000).toLocaleString("vi-VN")} lượt xem
              </span>
              <span>•</span>
              <span>Giảng viên: <span className="font-medium">{course.course.teacherName}</span></span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock /> Thời lượng: 3 tháng
              </span>
            </div>
          </div>

          {/* tabs */}
          <div className="mt-6 flex items-center gap-2">
            <button className="rounded-full px-4 py-2 bg-[#2563eb] text-white text-sm">Tổng quan</button>
            <button className="rounded-full px-4 py-2 border text-sm hover:bg-[#2563eb]/10">Nội dung học</button>
            <button className="rounded-full px-4 py-2 border text-sm hover:bg-[#2563eb]/10">Đánh giá</button>
          </div>

          {/* overview content */}
          <div className="mt-4 rounded-2xl border p-6 bg-white">
            <h3 className="font-semibold text-lg mb-2 text-slate-900">Bạn sẽ học được gì?</h3>
            <p className="text-slate-700">
              Hiểu vững JavaScript hiện đại, thành thạo React và NodeJS, kết nối cơ sở dữ liệu, xây dựng API,
              auth, upload, phân trang, tối ưu SEO và triển khai dự án thực tế.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-slate-800">
              <div className="flex items-start gap-2"><Check /><span>32 module chi tiết</span></div>
              <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
              <div className="flex items-start gap-2"><Check /><span>Học trên mọi thiết bị</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Ghost>Đào tạo cho đội nhóm (≥5 người)</Ghost>
              <button
                className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
                onClick={() =>
                  window?.navigator?.share?.({
                    title: "Khóa học Fullstack",
                    url: window.location?.href,
                  })
                }
              >
                Chia sẻ khóa học
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: price card (sticky) */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-slate-900">
                {course.course.price}đ
              </div>
              {/* <div className="text-sm text-slate-500 line-through">
                {Number(1499000).toLocaleString("vi-VN")}đ
              </div> */}
              <span className="ml-auto rounded-full text-xs px-2 py-1 bg-rose-100 text-rose-600">Giảm 40%</span>
            </div>
            <div className="mt-1 text-xs text-amber-600 inline-flex items-center gap-1">
              <Clock /> Còn 11 giờ với mức giá ưu đãi
            </div>

            <Primary className="w-full mt-4">Mua ngay</Primary>
            <Ghost className="w-full mt-2">Thêm vào giỏ</Ghost>

            <div className="mt-5 grid gap-2 text-sm text-slate-700">
              <div className="flex items-start gap-2"><Check /><span>32 module chi tiết</span></div>
              <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hỗ trợ hỏi đáp 24/7</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;