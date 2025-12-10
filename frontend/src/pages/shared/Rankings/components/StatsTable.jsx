import { Link } from "react-router-dom";

export default function StatsTable({ stats, currentMonth }) {
    const isMonthView = currentMonth !== undefined;

    if (!stats || stats.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                Không có dữ liệu thống kê cho tháng này.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Sinh viên</th>
                            {isMonthView ? (
                                <>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Bài viết (Tháng)</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Thảo luận (Tháng)</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Câu hỏi (Tháng)</th>
                                </>
                            ) : (
                                <>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Tổng bài viết</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Tổng thảo luận</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Tổng câu hỏi</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {stats.map((student) => (
                            <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <Link to={`/u/${student.studentId}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                        {student.fullName}
                                    </Link>
                                </td>
                                {isMonthView ? (
                                    <>
                                        <td className="px-6 py-4 text-center text-gray-700">{student.monthPosts}</td>
                                        <td className="px-6 py-4 text-center text-gray-700">{student.monthDiscussions}</td>
                                        <td className="px-6 py-4 text-center text-gray-700">{student.monthForumQuestions}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4 text-center text-gray-700">{student.totalPosts}</td>
                                        <td className="px-6 py-4 text-center text-gray-700">{student.totalDiscussions}</td>
                                        <td className="px-6 py-4 text-center text-gray-700">{student.totalForumQuestions}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}