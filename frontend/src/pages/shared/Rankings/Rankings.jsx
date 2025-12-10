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
    const monthParam = searchParams.get("month"); // Sẽ là null nếu không có hoặc là một chuỗi số
    // Nếu monthParam là null (không có trên URL), đó là chế độ "Tất cả" -> currentMonth là undefined.
    const currentMonth = monthParam ? parseInt(monthParam, 10) : undefined;

    const { data: statsData, isLoading: isLoadingStats, error: statsError } = useQuery({
        queryKey: ['stats', { month: currentMonth }],
        queryFn: () => getStats(currentMonth),
    });

    const handleMonthChange = (event) => {
        const selectedValue = event.target.value;
        setSearchParams(prev => {
            if (selectedValue === "") {
                prev.delete('month');
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
                <div className="max-w-5xl mx-auto mb-8">
                    {/* Page Header */}
                    <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
                        <div className="md:flex md:items-center md:justify-between">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                Bảng thống kê
                            </h2>
                            <div className="mt-4 flex md:absolute md:right-0 md:top-0 md:mt-0">
                                <select onChange={handleMonthChange} value={monthParam ?? ''} className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
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
