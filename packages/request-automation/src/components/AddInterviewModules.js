import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../AppContext";

const AddInterviewModules = () => {
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true); // State to track success
  const supabase = window.supabase; // Accessing Supabase client
  const { recruiterId: recruiter_id } = useContext(AppContext);

  // Fetch interview modules from external URL
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          "https://aglintai-seed-data.vercel.app/company/interview_module.json"
        );
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error("Error fetching interview modules:", error);
      }
    };

    fetchModules();
  }, []);

  const handleSelectModule = (name) => {
    setSelectedModules((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((moduleName) => moduleName !== name)
        : [...prevSelected, name]
    );
  };

  const handleAddSelectedModules = async () => {
    let success = true;

    // Prepare the selected modules for insertion
    const modulesToInsert = modules
      .filter((module) => selectedModules.includes(module.name))
      .map((module) => ({
        name: module.name,
        description: module.description,
        instructions: module.instructions,
        is_archived: false,
        recruiter_id,
      }));

    // Insert the selected modules into the interview_module table
    const { error } = await supabase
      .from("interview_module")
      .insert(modulesToInsert);

    if (error) {
      console.error("Error inserting modules:", error);
      success = false;
    } else {
      console.log("Modules inserted successfully:", modulesToInsert);
    }

    if (success) {
      setMessage("Selected interview modules added successfully.");
      setIsSuccess(true); // Set success status
    } else {
      setMessage(
        "There was an error adding some or all selected interview modules."
      );
      setIsSuccess(false); // Set failure status
    }

    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    setSelectedModules([]); // Clear selection after adding
  };

  return (
    <div>
      <h3>Select Interview Modules to Add</h3>
      {modules.length > 0 ? (
        modules.map((module) => (
          <div key={module.name}>
            <input
              type="checkbox"
              checked={selectedModules.includes(module.name)}
              onChange={() => handleSelectModule(module.name)}
            />
            <strong>{module.name}</strong>: {module.description}
          </div>
        ))
      ) : (
        <p>Loading modules...</p>
      )}
      <button
        onClick={handleAddSelectedModules}
        disabled={selectedModules.length === 0}
      >
        Add Selected Modules
      </button>
      {message && (
        <div style={{ marginTop: "10px", color: isSuccess ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddInterviewModules;
