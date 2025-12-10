import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TopThreePodium from "./components/TopThreePodium";
import RankingsTable from "./components/RankingsTable";
import StatsTable from "./components/StatsTable";
import { getRankings, getStats } from "./forumService";


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
    const [activeTab, setActiveTab] = useState(TABS.CONTRIBUTORS);

    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const currentMonth = parseInt(searchParams.get("month") || new Date().getMonth() + 1, 10);

    const { data: rankingsData, isLoading: isLoadingRankings, error: rankingsError } = useQuery({
        queryKey: ['rankings', { page: currentPage }],
        queryFn: () => getRankings({ page: currentPage, pageSize: 10 }),
        enabled: activeTab === TABS.CONTRIBUTORS,
        keepPreviousData: true,
    });

    const { data: statsData, isLoading: isLoadingStats, error: statsError } = useQuery({
        queryKey: ['stats', { month: currentMonth }],
        queryFn: () => getStats(currentMonth),
        enabled: activeTab === TABS.STATS,
    });

    const handlePageChange = (page) => {
        setSearchParams(prev => {
            prev.set('page', page);
            return prev;
        });
    };

    const handleMonthChange = (event) => {
        setSearchParams(prev => {
            prev.set('month', event.target.value);
            return prev;
        });
    };

    const topThree = useMemo(() => rankingsData?.items?.slice(0, 3) || [], [rankingsData]);
    const otherContributors = useMemo(() => rankingsData?.items?.slice(3) || [], [rankingsData]);

    const isLoading = isLoadingRankings || isLoadingStats;
    const error = rankingsError || statsError;

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <TopThreePodium topThree={topThree} />

                <div className="max-w-5xl mx-auto mt-12">
                    {/* Tabs and Filters */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex border-b border-gray-200">
                            <button onClick={() => setActiveTab(TABS.CONTRIBUTORS)} className={`px-4 py-2 text-sm font-medium ${activeTab === TABS.CONTRIBUTORS ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                Bảng xếp hạng
                            </button>
                            <button onClick={() => setActiveTab(TABS.STATS)} className={`px-4 py-2 text-sm font-medium ${activeTab === TABS.STATS ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                Thống kê
                            </button>
                        </div>
                        {activeTab === TABS.STATS && (
                            <select onChange={handleMonthChange} value={currentMonth} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
                            {activeTab === TABS.CONTRIBUTORS && rankingsData && (
                                <RankingsTable
                                    contributors={otherContributors}
                                    startRank={(currentPage - 1) * 10 + 4}
                                    currentPage={currentPage}
                                    totalPages={rankingsData.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                            {activeTab === TABS.STATS && statsData && (
                                <StatsTable stats={statsData} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
