import { Clock } from "lucide-react";

const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";

const fmtTime = (s) => {
    if (typeof s !== "number" || Number.isNaN(s) || s < 0) return "--:--";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

function HeaderExam({ exam, timeLeft, doSubmit }){
    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="w-full px-6 lg:px-12 py-3 flex items-center justify-between">
                <h1 className="text-lg md:text-xl font-extrabold" style={{ color: PRIMARY }}>
                    Làm bài thi {exam.title}
                </h1>
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className={`font-semibold ${timeLeft <= 30 ? "text-red-600" : "text-gray-900"}`}>
                            {fmtTime(timeLeft)}
                        </span>
                    </div>

                    <button
                        onClick={() => doSubmit(false)}
                        className="rounded-lg text-white px-4 py-2 text-sm font-semibold transition"
                        style={{ backgroundColor: PRIMARY }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                        type="button"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderExam;