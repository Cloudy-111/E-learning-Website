import { AlertTriangle, CheckCircle, Rocket } from "lucide-react";
import checkCourseCreate from "../CheckCourseCreate";

function SettingCourse({course, courseContent}) {
    const result = checkCourseCreate(course, courseContent);

    return (
        <div className="rounded-2xl border bg-white p-6 space-y-6">
            <div>
                <h2 className="text-lg font-bold text-gray-900">
                    3) Cài đặt
                </h2>
            </div>

            <div className="grid gap-4">
                {!result.ok && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 inline-flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        <div>
                            Cần kiểm tra lại thông tin bắt buộc trước khi tạo mới:
                            <ul>
                                {result.reason}
                            </ul>
                            
                        </div>
                    </div>
                )}
                {result.ok && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 inline-flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5" />
                        <div>
                            Mọi thông tin bắt buộc đã được điền đầy đủ. Bạn có thể tạo mới khoá học.
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => {console.log("Create course")}}
                disabled={!result.ok}
                className={`rounded-xl px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 ${result.ok
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
                <Rocket className="w-4 h-4" />{" "}
                    Create
                {/* {submitting ? (creationProgress || "Đang xử lý...") : "Create"} */}
            </button>
        </div>

    )
}

export default SettingCourse;