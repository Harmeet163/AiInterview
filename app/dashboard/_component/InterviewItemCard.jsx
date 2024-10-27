import React from "react";

const InterviewItemCard = ({ interview }) => {
  return (
    <div className="border shadow-sm rounded-lg p-3">
        <h2>{interview?.jobPosition}</h2>
    </div>
  );
};

export default InterviewItemCard;
