import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColumnSelectorSidebar from "./ColumnSelectorSidebar";

const Table = ({ data = [], linkColumn = 'id', onFilterClick, onRowClick }) => {
    const navigate = useNavigate();
    const [allColumns, setAllColumns] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (data && data.length) {
            const keys = Object.keys(data[0]);
            setAllColumns(keys);
            // By default, all columns are selected if not already set
            if (visibleColumns.length === 0) {
                setVisibleColumns(keys);
            }
        } else {
            setAllColumns([]);
        }
        setCurrentPage(1);
    }, [data]);

    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const paginatedData = Array.isArray(data) ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="p-2 sm:p-4 bg-base-100 flex-1 flex flex-col rounded-lg min-h-[450px]">
                <div className="flex flex-col sm:flex-row justify-end gap-2 p-2 mb-4 bg-base-200 rounded-md">
                    <div className="flex gap-2 items-center justify-end">
                        <button 
                            className="shadow-sm hover:shadow-md px-3 py-2 rounded text-sm bg-base-100 whitespace-nowrap"
                            onClick={() => setIsSelectorOpen(true)}
                        >
                            Customize Columns
                        </button>
                        <button 
                            className="shadow-sm hover:shadow-md px-3 py-2 rounded text-sm bg-base-100"
                            onClick={onFilterClick}
                        >
                            Filter
                        </button>
                        <button
                            className="btn btn-sm btn-primary px-3 py-2 rounded text-sm hidden md:flex"
                            onClick={() => navigate("/tasks/create")}
                        >
                            <Plus className="mr-1" size={18} /> Create Task
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto flex-1">
                    {!data || data.length === 0 ? (
                        <div className="p-8 text-center text-base-content/50">No record found</div>
                    ) : (
                        <table className="table w-full text-sm border-collapse rounded-lg min-w-[700px]">
                            <thead className="bg-[#eef3ff] text-gray-600">
                                <tr>
                                    {visibleColumns.map((col, idx) => (
                                        <th
                                            key={col}
                                            className={`text-left p-3 min-w-[250px] ${idx === 0 ? "rounded-tl-lg" : ""} ${idx === visibleColumns.length - 1 ? "rounded-tr-lg" : ""}`}
                                        >
                                            {col.replace(/_/g, " ").toUpperCase()}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, i) => (
                                    <tr key={row.id || i} className="border-b border-base-200 hover:bg-base-200">
                                        {visibleColumns.map((col) => {
                                            let value = row[col];
                                            if (typeof value === "object" && value !== null) {
                                                value = JSON.stringify(value);
                                            }
                                            if (col === linkColumn) {
                                                return (
                                                    <td
                                                        key={col}
                                                        className="p-3 text-left truncate max-w-[400px] underline text-primary hover:underline cursor-pointer font-semibold"
                                                        onClick={() => onRowClick && onRowClick(row)}
                                                    >
                                                        {value}
                                                    </td>
                                                );
                                            }
                                            return (
                                                <td key={col} className="p-3 text-left truncate max-w-[400px] ">{value}</td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>

            <ColumnSelectorSidebar 
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                columns={allColumns}
                visibleColumns={visibleColumns}
                onApply={setVisibleColumns}
            />
        </>
    );
};

export default Table;