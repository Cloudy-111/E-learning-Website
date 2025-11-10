import CategoryCard from "./CategoryCard";
import Primary from "./Primary";
import Section from "./Section";

function CoachingAndCategories({categories}) {
  return (
    <Section id="coaching">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* left text card */}
        <div className="rounded-2xl border p-6 bg-white">
          <h3 className="text-2xl font-bold text-[#2563eb]">
            Học trực tuyến cùng giảng viên hàng đầu
          </h3>
          <p className="text-slate-600 mt-2">
            Các khóa học được thiết kế chuyên nghiệp, hỗ trợ bạn học từ xa hiệu quả.
            Cập nhật kiến thức mới nhất, học mọi lúc mọi nơi chỉ với một cú click.
          </p>
          <Primary className="mt-4">Bắt đầu học ngay</Primary>
        </div>

        {/* right categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <CategoryCard key={i} name={c.name} description={c.description}/>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default CoachingAndCategories;