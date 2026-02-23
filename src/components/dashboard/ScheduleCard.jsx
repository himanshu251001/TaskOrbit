// components/dashboard/ScheduleCard.jsx

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../common/Card";

const ScheduleCard = () => {
  return (
    <Card
      title="Schedule Campaign"
      action={
        <div className="flex gap-2">
          <ChevronLeft size={18} />
          <ChevronRight size={18} />
        </div>
      }
    >
      <div className="mt-4 flex flex-col gap-4">
        <div className="p-4 rounded-xl bg-warning/20">
          <p className="font-medium">Element of Design Test</p>
          <p className="text-xs text-base-content/60">
            10:00 - 11:00 AM
          </p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/20">
          <p className="font-medium">Design Principle Test</p>
          <p className="text-xs text-base-content/60">
            10:00 - 11:00 AM
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleCard;
