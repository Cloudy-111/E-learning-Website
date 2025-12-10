import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import StatsTable from "./components/StatsTable";
import { getStats } from "./forumService";

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

export default function Rankings() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Lấy giá trị tháng từ URL, nếu là "" (Tất cả) thì là undefined, nếu không có thì mặc định là tháng hiện tại
    const monthParam = searchParams.get("month");
    const currentMonth = monthParam === "" ? undefined : (monthParam ? parseInt(monthParam, 10) : (new Date().getMonth() + 1));

    const { data: statsData, isLoading: isLoadingStats, error: statsError } = useQuery({
        queryKey: ['stats', { month: currentMonth }],
        queryFn: () => getStats(currentMonth),
    });

    const handleMonthChange = (event) => {
        const selectedValue = event.target.value;
        setSearchParams(prev => {
            if (selectedValue === "") {
                prev.delete('month'); // Xóa tham số 'month' khỏi URL khi chọn "Tất cả"
            } else {
                prev.set('month', selectedValue);
            }
            return prev;
        });
    };

    const isLoading = isLoadingStats;
    const error = statsError;

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Tabs and Filters */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex border-b border-gray-200">
                            <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-500 text-blue-600">
                                Bảng xếp hạng
                            </button>
                        </div>
                        {/* Month Filter */}
                            <select onChange={handleMonthChange} value={monthParam || ''} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option value="">Tất cả</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {isLoading && <LoadingSpinner />}
                    {error && <ErrorDisplay message={error.message} />}

                    {!isLoading && !error && (
                        <>
                            {statsData && (
                                <StatsTable stats={statsData} currentMonth={currentMonth} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
