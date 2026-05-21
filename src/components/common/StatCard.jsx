// components/common/StatCard.jsx

import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="flex flex-col flex-wrap gap-2 items-center md:items-start">
      <span className="text-sm text-base-content/60">{title}</span>

      <div className="px-4 flex items-center gap-3">
        <span className="text-2xl font-semibold">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;
