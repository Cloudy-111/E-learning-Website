import { useState, useEffect, useRef } from "react";
import { getCoursesByStatusByAdmin } from "../../../api/admin.api";
import { Check, X, Eye, Clock, CheckCircle, XCircle, GraduationCap } from "lucide-react";
import { ConfirmModal } from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/Toast";
import { PageLoading } from "../../../components/ui/LoadingSpinner";
import { CardSkeleton } from "../../../components/ui/Skeleton";
import Actions from "./Components/Actions";
import NoCourse from "./Components/NoCourse";
import CourseList from "./Components/CourseList/CourseList";

import Pagination from "../../../components/Pagination";

export default function CourseApprovals() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("pending");
    const [actionLoading, setActionLoading] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const { showToast } = useToast();
    const cacheRef = useRef(new Map());

    async function loadCourses(params = {}){
        const key = JSON.stringify(params);

        if (cacheRef.current.has(key)) {
            const cached = cacheRef.current.get(key);
            setCourses(cached.courses);
            setTotalPages(cached.totalPages);
            setCurrentPage(cached.currentPage);
            return;
        }

        try {
            setLoading(true);
            const result = await getCoursesByStatusByAdmin(params);
            const list = Array.isArray(result.data.courses) ? result.data.courses : [];

            const data = {
                courses: list,
                totalPages: result.data.totalPages || 1,
                currentPage: result.data.currentPage || 1,
            };
            cacheRef.current.set(key, data);

            setCourses(list);
            setTotalPages(result.data.totalPages || 1);
            setCurrentPage(result.data.currentPage || 1);
        } catch (error) {
            setError("Lỗi khi tải danh sách khóa học");
            console.error("Load courses error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadCourses({status: statusFilter});
    }, [statusFilter]);

    // const handleApprove = async (courseId) => {
    //     setActionLoading(courseId);
    //     try {
    //         await approveCourse(courseId);
    //         showToast("Đã duyệt khóa học thành công!", "success");
    //         loadCourses(); // Reload list
    //     } catch (error) {
    //         showToast("Lỗi khi duyệt khóa học", "error");
    //         console.error("Approve error:", error);
    //     } finally {
    //         setActionLoading(null);
    //     }
    // };

    const handleRejectClick = (course) => {
        setSelectedCourse(course);
        setRejectReason("");
        setShowRejectModal(true);
    };

    // const handleRejectConfirm = async () => {
    //     if (!rejectReason.trim()) {
    //         showToast("Vui lòng nhập lý do từ chối", "error");
    //         return;
    //     }

    //     setActionLoading(selectedCourse.id);
    //     try {
    //         await rejectCourse(selectedCourse.id, rejectReason);
    //         showToast("Đã từ chối khóa học", "success");
    //         setShowRejectModal(false);
    //         loadCourses();
    //     } catch (error) {
    //         showToast("Lỗi khi từ chối khóa học", "error");
    //         console.error("Reject error:", error);
    //     } finally {
    //         setActionLoading(null);
    //     }
    // };

    

    if(loading) return (
        <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )

    if(error) return (<div className="text-red-500"> {error} </div>)

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý khóa học</h1>
                <p className="text-gray-600 mt-2">Duyệt và quản lý các yêu cầu cập nhật khóa học</p>
            </div>

            <Actions statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>

            {courses.length === 0 ? (
                <NoCourse />
            ) : (
                <>
                    <CourseList
                        courses={courses}
                        statusFilter={statusFilter}
                        actionLoading={actionLoading}
                        handleRejectClick={handleRejectClick}
                    />
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={(page) => {
                            loadCourses({status: statusFilter, page})
                        }}
                    />
                </>
            )}

            {/* Reject Modal */}
            <ConfirmModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                // onConfirm={handleRejectConfirm}
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
