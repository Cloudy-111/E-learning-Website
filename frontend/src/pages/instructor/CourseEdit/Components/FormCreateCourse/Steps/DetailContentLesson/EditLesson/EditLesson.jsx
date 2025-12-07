import { X } from "lucide-react";

function EditLesson({lesson, openPopupDetailLesson, setOpenPopupDetailLesson}){
    if (!openPopupDetailLesson) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-lg font-semibold">Chi tiết bài học</h2>
                    <button
                        onClick={() => setOpenPopupDetailLesson(false)}
                        className="p-1 bg-transparent hover:bg-gray-100 rounded transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Add your lesson details form here */}
                    <p className="text-gray-600">{lesson ? lesson.title : "Lesson details content goes here"}</p>
                </div>

                <div className="flex justify-end gap-2 p-6 border-t">
                    <button
                        onClick={() => setOpenPopupDetailLesson(false)}
                        className="px-4 py-2 bg-transparent text-sm rounded-lg border hover:bg-gray-50"
                    >
                        Đóng
                    </button>
                    <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLesson;