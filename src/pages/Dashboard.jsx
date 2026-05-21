// pages/Dashboard.jsx

import PerformanceStats from "../components/dashboard/PerformanceStats";
import TeamWorkload from "../components/dashboard/TeamWorkload";
import ScheduleCard from "../components/dashboard/ScheduleCard";

export default function Dashboard() {
  return (
    <>
      <PerformanceStats />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <TeamWorkload />
        </div>
        <div className="flex-1">
          <ScheduleCard />
        </div>
      </div>
    </>
  );
}
