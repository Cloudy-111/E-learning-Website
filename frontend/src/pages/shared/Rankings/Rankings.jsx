import { useState, useEffect } from "react";
import TopThreePodium from "./components/TopThreePodium";
import RankingsTable from "./components/RankingsTable";
import { getTopThree, getPaginatedContributors } from "./data/mockData";

export default function Rankings() {
    const [topThree, setTopThree] = useState([]);
    const [tableData, setTableData] = useState({
        data: [],
        totalPages: 1,
        currentPage: 1,
        startRank: 4
    });

    useEffect(() => {
        // Load initial data
        setTopThree(getTopThree());

        // Load first page of table data
        const initialTableData = getPaginatedContributors(1);
        setTableData(initialTableData);
    }, []);

    const handlePageChange = (page) => {
        const newTableData = getPaginatedContributors(page);
        setTableData(newTableData);

        // Scroll to table top smoothly
        document.getElementById('rankings-table').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top 3 Podium Section */}
                <TopThreePodium topThree={topThree} />

                {/* Rankings Table Section */}
                <div id="rankings-table" className="mt-12">
                    <RankingsTable
                        contributors={tableData.data}
                        startRank={tableData.startRank}
                        currentPage={tableData.currentPage}
                        totalPages={tableData.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
