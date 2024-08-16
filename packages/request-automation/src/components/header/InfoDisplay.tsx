import React from "react";
import { useAppContext } from "../../AppContext";

const InfoDisplay = () => {
  const { companyName, recruiterId, userId } = useAppContext();

  return (
    <div className="info-display">
      <span className="i-btn">ℹ</span>
      <div className="info-content">
        <p>
          <strong>Company Name:</strong> {companyName || "N/A"}
        </p>
        <p>
          <strong>Recruiter ID:</strong> {recruiterId || "N/A"}
        </p>
        <p>
          <strong>User ID:</strong> {userId || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default InfoDisplay;
