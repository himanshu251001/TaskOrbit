// components/common/Card.jsx

import React from "react";

const Card = ({ title, action, children }) => {
  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
