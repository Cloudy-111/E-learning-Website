/* ===== “Dành cho giảng viên” ===== */
function ForInstructors() {
  const cards = Array.from({ length: 3 }).map((_, i) => ({ id: i }));
  return (
    <Section id="instructors" title="Dành cho giảng viên">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.id} className="relative rounded-2xl border p-6 bg-white">
            <span className="absolute -top-3 right-4 text-xs rounded-full bg-[#2563eb] text-white px-3 py-1">
              Ưu đãi
            </span>
            <h3 className="font-semibold text-lg text-slate-900">
              Quản lý lớp học, lịch dạy & bài tập
            </h3>
            <p className="text-slate-600 mt-2">
              Công cụ hỗ trợ giảng dạy trực tuyến, giao bài – chấm bài – theo dõi tiến độ ngay trên nền tảng.
            </p>
            <Primary className="mt-4">Khám phá</Primary>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default ForInstructors;