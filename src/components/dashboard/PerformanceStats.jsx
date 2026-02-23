
import Card from "../common/Card";
import StatCard from "../common/StatCard";

const PerformanceStats = () => {
  return (
    <Card title="Performance Over Time">
      <div className="flex w-full flex-wrap gap-6 mt-4">
        <div className="w-full md:flex-1">
          <StatCard
            title="Delivered"
            value="42,642"
            change="+0.02%"
            positive
          />
        </div>

        <div className="w-full md:flex-1">
          <StatCard
            title="Opened"
            value="26,843"
            change="-0.02%"
          />
        </div>

        <div className="w-full md:flex-1">
          <StatCard
            title="Clicked"
            value="525,753"
            change="+0.02%"
            positive
          />
        </div>

        <div className="w-full md:flex-1">
          <StatCard
            title="Subscribed"
            value="425"
            change="+0.02%"
            positive
          />
        </div>
      </div>
    </Card>
  );
};

export default PerformanceStats;
