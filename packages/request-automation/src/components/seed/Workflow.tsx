import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

function Workflow() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { recruiterId } = useAppContext();
  const seedHandler = async () => {
    setIsLoading(true);
    await axios.post("/api/pre-seed", {
      record: {
        id: recruiterId,
      },
    });
    setIsLoading(false);
  };
  return (
    <div>
      <div>
        <p style={{ marginBottom: "10px" }}>
          Reset all workflows to defualt.
        </p>
        <button onClick={seedHandler} disabled={isLoading}>
          {isLoading ? "Seeding..." : " Seed Workflow"}
        </button>
      </div>
      <div>
        <p style={{ marginBottom: "10px" }}>
          Reset all email templates to defualt.
        </p>
        <button onClick={seedHandler} disabled={isLoading}>
          {isLoading ? "Seeding..." : " Seed Workflow"}
        </button>
      </div>
    </div>
  );
}

export default Workflow;
