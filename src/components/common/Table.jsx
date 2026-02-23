import React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Funnel
} from "lucide-react";

const Table = ({ data = [] }) => {
    return (

        <>
            <div className="w-full min-h-dvh sm:min-h-0">
                <div className="flex flex-row flex-wrap justify-end lg:items-center  gap-4 mb-4" >
                    <div className="flex items-center gap-2 justify-end" >
                        <button className="btn btn-outline btn-sm gap-2">
                            <Funnel className="w-4 h-4" />
                            Filter
                        </button>

                    </div >
                </div >

                <div className="bg-base-100 p-4 rounded-xl flex flex-col flex-wrap shadow-sm ">

                    <div className="border w-full rounded-lg overflow-x-auto ">
                        <table className="table w-full min-w-max ">
                            <thead className="bg-base-200 text-base-content uppercase text-xs ">
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Job Title</th>
                                    <th>Department</th>
                                    <th>Location</th>
                                    <th>Date of Joining</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((emp) => (
                                    <tr
                                        key={emp.id}
                                        className="border-b hover:bg-base-200 "
                                    >
                                        <td>{emp.id}</td>
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <span className="text-primary font-medium hover:underline">
                                                    {emp.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="truncate">{emp.email}</td>
                                        <td>{emp.jobTitle}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.location}</td>
                                        <td>{emp.joiningDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between mt-4 gap-4 w-full sm:gap-0">

                        {/* Page Numbers */}
                        <div className="flex items-center gap-2 text-sm w-full lg:w-auto justify-center sm:gap-1">

                            <button className="btn btn-ghost btn-sm gap-1">
                                <ChevronLeftIcon className="w-4 h-4" />
                                Prev
                            </button>

                            <button className="btn btn-primary btn-sm">1</button>
                            <button className="btn btn-ghost btn-sm">2</button>
                            <button className="btn btn-ghost btn-sm">3</button>


                            <button className="btn btn-ghost btn-sm gap-1">
                                Next
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Page Size */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Page Size</span>
                            <select className="select select-bordered select-sm">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Table;