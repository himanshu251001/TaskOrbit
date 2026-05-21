import React from "react";

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) => {
    const getPageNumbers = () => {
        const windowSize = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + windowSize - 1);
        if (end - start + 1 < windowSize) {
            start = Math.max(1, end - windowSize + 1);
        }
        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="flex flex-wrap justify-between items-center gap-3 mt-auto pt-2 text-sm">

            <div className="flex flex-wrap gap-2 sm:gap-4 items-center px-1">
                <button
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "text-base-content/30 cursor-not-allowed" : "text-base-content/70 hover:bg-base-200"}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 rounded ${page === currentPage
                            ? "bg-primary text-primary-content"
                            : "hover:bg-base-200 text-base-content/70"
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "text-base-content/30 cursor-not-allowed" : "text-base-content/70 hover:bg-base-200"}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

                <span className="text-base-content/50 ml-2">{`Page ${currentPage} of ${totalPages}`}</span>
            </div>

            <div className="bg-base-200 p-2 sm:py-2 sm:px-5 rounded-lg text-sm">
                <span className="font-bold">Page Size:</span>
                <select
                    className="ml-2 border rounded px-2 py-1"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

        </div>
    );
};

export default Pagination;
