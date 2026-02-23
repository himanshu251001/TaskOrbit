// components/dashboard/CampaignPerformance.jsx

import React from "react";
import { MoreVertical } from "lucide-react";
import Card from "../common/Card";

const CampaignPerformance = () => {
  return (
    <Card
      title="Campaign Performance"
      action={<MoreVertical size={18} className="cursor-pointer" />}
    >
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">$24,747.01</h3>
        <p className="text-sm text-success">↑ 12% vs last month</p>

        <div className="mt-6 flex items-end gap-4 h-40">
          {[40, 60, 90, 50, 70, 80].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/70 rounded-xl"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CampaignPerformance;
