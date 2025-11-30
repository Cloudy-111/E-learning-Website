import { useState, useEffect } from "react";
import { getCoursesByStatus, approveCourse, rejectCourse } from "../../api/admin.api";
import { Check, X, Eye, Clock, CheckCircle, XCircle, GraduationCap } from "lucide-react";
import { ConfirmModal } from "../../components/ui/Modal";
import { useToast } from "../../components/ui/Toast";
import { PageLoading } from "../../components/ui/LoadingSpinner";
import { CardSkeleton } from "../../components/ui/Skeleton";

/**
 * CourseApprovals - Admin page to approve/reject course update requests
 */
export default function CourseApprovals() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("pending");
    const [actionLoading, setActionLoading] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const { showToast } = useToast();

    const loadCourses = async () => {
        setLoading(true);
        try {
            const data = await getCoursesByStatus(statusFilter);
            setCourses(data?.data || []);
        } catch (error) {
            showToast("Lỗi khi tải danh sách khóa học", "error");
            console.error("Load courses error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, [statusFilter]);

    const handleApprove = async (courseId) => {
        setActionLoading(courseId);
        try {
            await approveCourse(courseId);
            showToast("Đã duyệt khóa học thành công!", "success");
            loadCourses(); // Reload list
        } catch (error) {
            showToast("Lỗi khi duyệt khóa học", "error");
            console.error("Approve error:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleRejectClick = (course) => {
        setSelectedCourse(course);
        setRejectReason("");
        setShowRejectModal(true);
    };

    const handleRejectConfirm = async () => {
        if (!rejectReason.trim()) {
            showToast("Vui lòng nhập lý do từ chối", "error");
            return;
        }

        setActionLoading(selectedCourse.id);
        try {
            await rejectCourse(selectedCourse.id, rejectReason);
            showToast("Đã từ chối khóa học", "success");
            setShowRejectModal(false);
            loadCourses();
        } catch (error) {
            showToast("Lỗi khi từ chối khóa học", "error");
            console.error("Reject error:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { label: "Chờ duyệt", className: "bg-yellow-100 text-yellow-800", icon: Clock },
            approved: { label: "Đã duyệt", className: "bg-green-100 text-green-800", icon: CheckCircle },
            rejected: { label: "Đã từ chối", className: "bg-red-100 text-red-800", icon: XCircle },
        };
        const badge = badges[status?.toLowerCase()] || badges.pending;
        const Icon = badge.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.className}`}>
                <Icon className="w-4 h-4" />
                {badge.label}
            </span>
        );
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý khóa học</h1>
                <p className="text-gray-600 mt-2">Duyệt và quản lý các yêu cầu cập nhật khóa học</p>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="flex border-b">
                    {["pending", "approved", "rejected"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-6 py-4 font-medium transition-colors ${statusFilter === status
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {status === "pending" && "Chờ duyệt"}
                            {status === "approved" && "Đã duyệt"}
                            {status === "rejected" && "Đã từ chối"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses List */}
            {loading ? (
                <div className="space-y-4">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            ) : courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <GraduationCap className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Không có khóa học nào</h3>
                    <p className="text-gray-500">Chưa có khóa học nào trong trạng thái này</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{course.title || course.name}</h3>
                                        {getStatusBadge(course.status)}
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {course.description || "Không có mô tả"}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Giảng viên:</span>
                                            <p className="font-medium text-gray-900">{course.teacherName || "N/A"}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Thể loại:</span>
                                            <p className="font-medium text-gray-900">{course.categoryName || "N/A"}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Giá:</span>
                                            <p className="font-medium text-gray-900">
                                                {course.price?.toLocaleString("vi-VN")}đ
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                {statusFilter === "pending" && (
                                    <div className="flex flex-col gap-2 ml-6">
                                        <button
                                            onClick={() => handleApprove(course.id)}
                                            disabled={actionLoading === course.id}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Check className="w-4 h-4" />
                                            Duyệt
                                        </button>
                                        <button
                                            onClick={() => handleRejectClick(course)}
                                            disabled={actionLoading === course.id}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <X className="w-4 h-4" />
                                            Từ chối
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reject Modal */}
            <ConfirmModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onConfirm={handleRejectConfirm}
                title="Từ chối khóa học"
                confirmText="Xác nhận từ chối"
                cancelText="Hủy"
                variant="danger"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Bạn có chắc muốn từ chối khóa học <strong>{selectedCourse?.title}</strong>?
                    </p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do từ chối <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Nhập lý do từ chối..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            rows={4}
                        />
                    </div>
                </div>
            </ConfirmModal>
        </div>
    );
}
