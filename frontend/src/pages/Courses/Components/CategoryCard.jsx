function CategoryCard({ name, description }) {
  return (
    <div className="rounded-2xl border p-5 bg-white hover:shadow-md transition">
      <div className="mt-3 font-semibold text-slate-900">{name}</div>
      <p className="text-sm text-slate-600 mt-1">
        {description || "Khám phá các khóa học trong danh mục này để nâng cao kỹ năng và kiến thức của bạn."}
      </p>
    </div>
  );
}

export default CategoryCard;