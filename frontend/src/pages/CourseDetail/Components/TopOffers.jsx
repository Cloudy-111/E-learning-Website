
/* ===== “Ưu đãi giáo dục nổi bật” ===== */
function TopOffers() {
  const items = Array.from({ length: 4 }).map((_, i) => ({ id: i }));
  return (
    <Section
      id="offers"
      title="Ưu đãi giáo dục nổi bật"
      action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((x) => (
          <div key={x.id} className="rounded-2xl border bg-white p-5">
            <div className="aspect-[16/9] rounded-xl bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Ảnh ưu đãi</span>
            </div>
            <h4 className="mt-3 font-semibold text-slate-900">Giảm lớn cho học viên mới</h4>
            <p className="text-sm text-slate-600 mt-1">Áp dụng trong thời gian có hạn</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TopOffers;