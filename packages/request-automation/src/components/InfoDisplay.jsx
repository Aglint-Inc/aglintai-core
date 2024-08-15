import React, { useContext } from "react";
import "./InfoDisplay.css";
import { AppContext } from "../AppContext";

const InfoDisplay = () => {
  const { companyName, recruiterId, userId } = useContext(AppContext);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        ℹ
      </span>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
        className="info-content"
      >
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
