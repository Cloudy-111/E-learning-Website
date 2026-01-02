// src/pages/shared/Blog/components/HeroSection.jsx
import { BORDER } from "../utils/constants";
import { Primary } from "./Common";

export default function HeroSection() {
    return (
        <section className="w-screen overflow-x-hidden bg-white pt-8">
            <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
                {/* Trái: minh hoạ */}
                <div className="order-2 lg:order-1">
                    <div
                        className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-blue-100 via-sky-100 to-indigo-100 border grid place-items-center"
                        style={{ borderColor: BORDER }}
                    >
                        <img 
                            src="https://images.pexels.com/photos/35391833/pexels-photo-35391833.jpeg" 
                            alt="Learning Illustration" 
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Phải: nội dung */}
                <div className="order-1 lg:order-2">
                    <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
                        P Elearning • Blog
                    </div>
                    <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl text-slate-900">
                        Kiến thức công nghệ & thiết kế dành cho người học Việt
                    </h1>
                    <p className="text-slate-600 mt-4 max-w-2xl">
                        Bài viết chọn lọc về lập trình, thiết kế trải nghiệm người dùng, và
                        marketing số — cập nhật xu hướng & mẹo thực chiến.
                    </p>
                    <div className="mt-6">
                        <Primary
                            onClick={() =>
                                window.scrollTo({
                                    top: window.innerHeight,
                                    behavior: "smooth",
                                })
                            }
                        >
                            Đọc bài mới nhất
                        </Primary>
                    </div>
                </div>
            </div>
        </section>
    );
}
