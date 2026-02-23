// components/common/StatCard.jsx

import React from "react";

const StatCard = ({ title, value, change, positive }) => {
  return (
    <div className="flex flex-col flex-wrap gap-2">
      <span className="text-sm text-base-content/60">{title}</span>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold">{value}</span>

        <span
          className={`badge badge-sm ${
            positive ? "badge-success" : "badge-error"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
