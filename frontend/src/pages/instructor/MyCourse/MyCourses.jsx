import { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import CommonStats from "./Components/CommonStats";
import SearchBar from "./Components/SearchBar";
import CourseCard from "./Components/CourseCard";
import Pagination from "../../../components/Pagination";
import PopupAlertConfirm from "../../../components/PopupAlertConfirm";

import { fetchInstructorCourses } from "../../../api/courses.api";
import { requestPublishCourse } from "../../../api/courses.api";

function MyCourses(){
    const [courses, setCourses] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");;
    const [status, setStatus] = useState("");
    const [sort, setsort] = useState("");

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [openPopup, setOpenPopup] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

    const handleOpenConfirm  = (courseId, courseTitle) => {
        setSelectedCourseId(courseId);
        setSelectedCourseTitle(courseTitle);
        setOpenPopup(true);
    }

    const handleConfirmPublish = async () => {
        try{
            const res = await requestPublishCourse(selectedCourseId);
            alert(res.message || "Gửi yêu cầu publish khoá học thành công!");
            window.location.reload();
        } catch (e) {
            alert("Gửi yêu cầu publish khoá học thất bại: " + e.message);
        } finally {
            setOpenPopup(false);
        }
    }

    async function loadCourses(params = {}) {
        try {
            setLoading(true);
            setError("");
            const result = await fetchInstructorCourses(params);

            const list = Array.isArray(result.data.courses) ? result.data.courses : [];
            setCourses(list);
            setStatistics(result.data.statistics || {});
            setTotalPages(result.data.totalPages || 1);
            setCurrentPage(result.data.currentPage || 1);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách khóa học. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCourses( { sort: sort, status: status } );
    }, [sort, status]);

    const handleSearch = () => {
        loadCourses({ keyword: query, status: status, sort: sort });
    };

    // const exportCSV = () => {
    //   const rows = [
    //     ["id","title","status","enrolls","updated"],
    //     ...filtered.map(c => [c.id, c.title, c.status, c.enrolls, c.updated]),
    //   ];
    //   const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url; a.download = "courses.csv"; a.click();
    //   URL.revokeObjectURL(url);
    // };

    if(loading){
        return (
            <div className="w-full px-6 lg:px-12 py-8">
                <div className="text-center text-gray-600">Đang tải khoá học...</div>
            </div>
        )
    }

    if(error){
        return (
            <div className="w-full px-6 lg:px-12 py-8">
                <div className="text-center text-red-600">{error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-screen max-w-none bg-white">
            <Hero exportCSV={() => {}} />
        
            <main className="w-full px-6 lg:px-12 py-8 space-y-8">
                <CommonStats stats={statistics} />

                <SearchBar 
                    q={query} 
                    setQ={setQuery} 
                    status={status} 
                    setStatus={setStatus} 
                    sort={sort} 
                    setsort={setsort}
                    handleSearch={handleSearch} 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {courses.length === 0 && (
                        <div className="col-span-full text-center text-sm text-gray-600 border rounded-2xl py-10">
                            Không có khoá học nào khớp bộ lọc hiện tại.
                        </div>
                    )}

                    {courses.map((c) => (
                        <CourseCard key={c.id} c={c} onRequestPublish={() => handleOpenConfirm(c.id, c.title)}/>
                    ))}
                </div>

                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={(page) => {
                        loadCourses({keyword: query, status: status, sort: sort, page})
                    }}/>

                <PopupAlertConfirm 
                    open={openPopup}
                    title="Xác nhận yêu cầu publish khoá học"
                    message={`Bạn có chắc chắn muốn gửi yêu cầu publish khoá học ${selectedCourseTitle} không? Sau khi gửi, khoá học sẽ được xem xét để phê duyệt.`}
                    confirmText="Gửi yêu cầu"
                    cancelText="Hủy"
                    onConfirm={handleConfirmPublish}
                    onCancel={() => {setOpenPopup(false)}}
                />
            </main>
        </div>
    )
}

export default MyCourses;