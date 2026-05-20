// components/common/Card.jsx

import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl overflow-y-auto max-h-[500px] ">
      <div className="card-body ">
        <div className="flex items-center justify-center md:justify-between ">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
