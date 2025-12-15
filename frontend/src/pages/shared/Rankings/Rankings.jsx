import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import StatsTable from "./components/StatsTable";
import TopThreePodium from "./components/TopThreePodium";
import { getStats } from "./forumService";
import { useSearchParams } from "react-router-dom";

const TABS = {
    CONTRIBUTORS: 'contributors',
    STATS: 'stats',
};

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}

function ErrorDisplay({ message }) {
    return (
        <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
            <p className="font-semibold">Đã có lỗi xảy ra</p>
            <p>{message || "Không thể tải dữ liệu. Vui lòng thử lại sau."}</p>
        </div>
    );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex items-center justify-end gap-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Trang trước
            </button>
            <div className="text-sm text-gray-700">
                Trang <span className="font-semibold">{currentPage}</span> / <span className="font-semibold">{totalPages}</span>
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Trang sau
            </button>
        </div>
    );
}

export default function Rankings() {
    const [currentMonth, setCurrentMonth] = useState(undefined); // Mặc định là "Tất cả"
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    const { data: statsData, isLoading: isLoadingStats, error: statsError } = useQuery({
        queryKey: ['stats', { month: currentMonth }],
        queryFn: () => getStats(currentMonth),
    });

    const handleMonthChange = (event) => {
        const value = event.target.value;
        setCurrentMonth(value === "" ? undefined : parseInt(value, 10));
        setCurrentPage(1); // Reset về trang đầu khi đổi tháng
    };

    const processedStats = useMemo(() => {
        if (!statsData) return { topThree: [], others: [] };

        const isMonthView = currentMonth !== undefined;

        const sorted = [...statsData]
            .map(student => {
                const posts = isMonthView ? student.monthPosts : student.totalPosts;
                const questions = isMonthView ? student.monthForumQuestions : student.totalForumQuestions;
                const discussions = isMonthView ? student.monthDiscussions : student.totalDiscussions;
                const contributionScore = (posts * 20) + (questions * 5) + (discussions * 1);
                return { ...student, contributionScore };
            })
            .sort((a, b) => b.contributionScore - a.contributionScore);

        return {
            topThree: sorted.slice(0, 3),
            others: sorted.slice(3),
        };
    }, [statsData, currentMonth]);

    const isLoading = isLoadingStats;
    const error = statsError;

    const totalPages = Math.ceil(processedStats.others.length / ITEMS_PER_PAGE);
    const paginatedOthers = processedStats.others.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto mb-8">
                    <TopThreePodium topThree={processedStats.topThree} />

                    {/* Page Header */}
                    <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
                        <div className="md:flex md:items-center md:justify-between">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                Bảng thống kê
                            </h2>
                            <div className="mt-4 flex md:absolute md:right-0 md:top-0 md:mt-0">
                                <select onChange={handleMonthChange} value={currentMonth ?? ''} className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                                    <option value="">Tất cả</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {isLoading && <LoadingSpinner />}
                    {error && <ErrorDisplay message={error.message} />}

                    {!isLoading && !error && (
                        <>
                            {paginatedOthers.length > 0 ? (
                                <>
                                    <StatsTable stats={paginatedOthers} currentMonth={currentMonth} />
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                                </>
                            ) : (
                                <div className="text-center py-10 text-gray-500">Không có dữ liệu để hiển thị.</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}
