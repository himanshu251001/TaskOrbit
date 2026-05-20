import { useEffect, useState } from "react";
import { fetchStats } from "../../services/taskService";
import Card from "../common/Card";
import StatCard from "../common/StatCard";

const PerformanceStats = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const fetchStat = async () => {
      const data = await fetchStats();
      setStats(data);
    };
    fetchStat();
  }, []);

  return (
    <Card title="Performance Over Time">
      <div className="flex w-full flex-wrap gap-6 mt-4 ">
        <div className="w-full md:flex-1 ">
          <StatCard
            title="Total Tickets"
            value={stats.total}
          />
        </div>

        <div className="w-full md:flex-1">
          <StatCard
            title="Opened"
            value={stats.open}
          />
        </div>

        <div className="w-full md:flex-1">
          <StatCard
            title="Closed"
            value={stats.closed}
          />
        </div>

        <div className="w-full md:flex-1">
          <StatCard
            title="In Progress"
            value={stats.inProgress}
          />
        </div>
      </div>
    </Card>
  );
};

export default PerformanceStats;
