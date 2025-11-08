
/* ===== “Bài viết/Chia sẻ kinh nghiệm” grid ===== */
function MarketingArticles() {
  const items = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    title: "Mẹo học React hiệu quả cho người mới",
    desc: "Lộ trình 30 ngày làm quen React, hook cơ bản và triển khai dự án mini.",
    teacher: "Biên tập P Elearning",
    priceOld: 199000,
    price: 0,
    tag: "Chia sẻ",
    duration: "5 phút đọc",
  }));
  return (
    <Section
      id="marketing"
      title="Bài viết & Chia sẻ kinh nghiệm học tập"
      action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((c) => (
          <article key={c.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
            <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Ảnh bài viết</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900">{c.title}</h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-600">{c.teacher}</span>
                <div className="flex items-center gap-2">
                  {c.priceOld > 0 && (
                    <span className="text-slate-400 line-through">
                      {c.priceOld.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                  <span className="font-semibold text-[#2563eb]">
                    {c.price === 0 ? "Miễn phí" : `${c.price.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>
              </div>
              <div className="mt-1 text-xs text-slate-500 inline-flex items-center gap-2">
                <span>{c.tag}</span> •{" "}
                <span className="inline-flex items-center gap-1">
                  <Clock /> {c.duration}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default MarketingArticles;