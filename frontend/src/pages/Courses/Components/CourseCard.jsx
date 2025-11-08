import { Link } from "react-router-dom";

const Clock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

function CourseCard({ c }) {
  return (
    <Link
      to={`/courses/${c.id}`}
      className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
    >
      <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
        <span className="text-xs text-blue-400">Ảnh khóa học</span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold leading-snug text-slate-900 group-hover:text-[#2563eb] transition">
          {c.title}
        </h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-600">{c.teacher}</span>
          <div className="flex items-center gap-2">
            <span className="line-through text-slate-400">{c.priceOld.toLocaleString()}đ</span>
            <span className="font-semibold text-[#2563eb]">{c.price.toLocaleString()}đ</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
          <span>{c.tag}</span>
          <span className="inline-flex items-center gap-1">
            <Clock /> {c.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;