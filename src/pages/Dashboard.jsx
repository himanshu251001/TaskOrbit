// pages/Dashboard.jsx

import PerformanceStats from "../components/dashboard/PerformanceStats";
import CampaignPerformance from "../components/dashboard/CampaignPerformance";
import ScheduleCard from "../components/dashboard/ScheduleCard";

export default function Dashboard() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/60">
          Welcome, Let’s dive into your personalized setup guide.
        </p>
      </div>

      <PerformanceStats />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <CampaignPerformance />
        </div>
        <div className="flex-1">
          <ScheduleCard />
        </div>
      </div>
    </>
  );
}
