import { useRef } from "react";

/* ===== banner: Everything you can do… ===== */
function EverythingBanner() {
  const wrapRef = useRef(null);
  const scroll = (dir) => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };
  return (
    <Section
      id="totc"
      title="Quản lý lớp học dễ dàng – Tất cả trong một nền tảng"
      subtitle="Lịch học, điểm danh, thanh toán và lớp học trực tuyến trên cùng một hệ thống an toàn."
      action={
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50">‹</button>
          <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50">›</button>
          <Link to="#" className="text-[#2563eb] ml-2 hover:underline">Tìm hiểu thêm</Link>
        </div>
      }
    >
      <div ref={wrapRef} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="min-w-[320px] max-w-[320px] rounded-2xl border bg-white overflow-hidden">
            <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Slide {i + 1}</span>
            </div>
            <div className="p-5 text-sm text-slate-700">
              Nền tảng quản lý đào tạo hỗ trợ thiết lập lịch học, điểm danh, thu phí và dạy trực tuyến ngay trong một nơi.
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default EverythingBanner;