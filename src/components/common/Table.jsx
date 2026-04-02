import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
// import SideDetailsPanel from "./SideDetailsPanel";
import Pagination from "./Pagination";
// import { useUser } from "../context/UserContext";

const Table = ({ data = [], linkColumn ='id'}) => {
    const [columns, setColumns] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setColumns(data && data.length ? Object.keys(data[0]) : []);
        setCurrentPage(1);
    }, [data]);

    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const paginatedData = data ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

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
                {/* filter */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 p-2 mb-4 bg-base-200 rounded-md">
                    <div className="flex gap-2">
                        <button className="shadow-sm hover:shadow-md px-3 py-2 rounded text-sm bg-base-100 whitespace-nowrap">
                            Customize Columns
                        </button>
                        <button className="shadow-sm hover:shadow-md px-3 py-2 rounded text-sm bg-base-100">
                            Filter
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
                                    {columns.map((col, idx) => (
                                        <th
                                            key={col}
                                            className={`text-left p-3 min-w-[250px] ${idx === 0 ? "rounded-tl-lg" : ""} ${idx === columns.length - 1 ? "rounded-tr-lg" : ""}`}
                                        >
                                            {col.replace(/_/g, " ").toUpperCase()}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, i) => (
                                    <tr key={row.id || i} className="border-b border-base-200 hover:bg-base-200">
                                        {columns.map((col) => {
                                            let value = row[col];
                                            if (typeof value === "object" && value !== null) {
                                                value = JSON.stringify(value);
                                            }
                                            if (col === linkColumn) {
                                                return (
                                                    <td
                                                        key={col}
                                                        className="p-3 text-left truncate max-w-[400px] underline text-primary hover:underline cursor-pointer font-semibold"
                                                    onClick={() => setSelectedRow(row)}
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

                {/* <SideDetailsPanel
                    isOpen={!!selectedRow}
                    data={selectedRow}
                    columns={columns}
                    onClose={() => setSelectedRow(null)}
                    isEditable={isEditable}
                /> */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>
        </>

    );
};

export default Table;