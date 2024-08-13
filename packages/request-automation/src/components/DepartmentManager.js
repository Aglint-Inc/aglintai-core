import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";

const DepartmentManager = () => {
  const { recruiterId: recruiter_id } = useContext(AppContext); // Destructuring and renaming recruiterId to recruiter_id
  const supabase = window.supabase; // Supabase object from window
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [selectedNewDepartments, setSelectedNewDepartments] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch departments from Supabase
  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .eq("recruiter_id", recruiter_id);
    if (error) {
      console.error("Error fetching departments:", error);
    } else {
      setDepartments(data);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [supabase, recruiter_id]);

  // Fetch departments from external URL
  useEffect(() => {
    const fetchAvailableDepartments = async () => {
      try {
        const response = await fetch(
          "https://aglintai-seed-data.vercel.app/company/departments.json"
        );
        const data = await response.json();

        // Filter out departments that already exist in Supabase
        const existingNames = departments.map((dept) =>
          dept.name.toLowerCase()
        );
        const newDepartments = data.filter(
          (dept) => !existingNames.includes(dept.name.toLowerCase())
        );

        setAvailableDepartments(newDepartments);
      } catch (error) {
        console.error("Error fetching available departments:", error);
      }
    };

    fetchAvailableDepartments();
  }, [departments]);

  const handleSelectDepartment = (id) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((deptId) => deptId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectNewDepartment = (name) => {
    setSelectedNewDepartments((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((deptName) => deptName !== name)
        : [...prevSelected, name]
    );
  };

  const handleUpdate = async () => {
    let success = true;
    const usedNewDepartments = [];

    // Handle existing departments marked for "deletion" (try to update them with new departments)
    for (let id of selectedDepartments) {
      if (selectedNewDepartments.length > 0) {
        const newName = selectedNewDepartments.shift();
        usedNewDepartments.push(newName);

        const { error } = await supabase
          .from("departments")
          .update({ name: newName })
          .eq("id", id)
          .eq("recruiter_id", recruiter_id);

        if (error) {
          console.error("Error updating department:", error);
          success = false;
        }
      } else {
        const { error } = await supabase
          .from("departments")
          .delete()
          .eq("id", id)
          .eq("recruiter_id", recruiter_id);

        if (error) {
          console.error("Error deleting department:", error);
          success = false;
        }
      }
    }

    // Handle adding new departments (those that were not used in the update)
    for (let name of selectedNewDepartments) {
      if (!usedNewDepartments.includes(name)) {
        const { error } = await supabase
          .from("departments")
          .insert({ name, recruiter_id });

        if (error) {
          console.error("Error adding department:", error);
          success = false;
        }
      }
    }

    if (success) {
      setMessage("Departments updated successfully.");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      setSelectedDepartments([]);
      setSelectedNewDepartments([]);
      fetchDepartments(); // Refresh the existing departments list
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        {/* Existing Departments Column */}
        <div style={columnStyle}>
          <h3>Existing Departments</h3>
          {departments.map((department) => (
            <div key={department.id}>
              <input
                type="checkbox"
                checked={selectedDepartments.includes(department.id)}
                onChange={() => handleSelectDepartment(department.id)}
              />
              {department.name}
            </div>
          ))}
        </div>

        {/* Available Departments Column */}
        <div style={columnStyle}>
          <h3>Available Departments to Add</h3>
          {availableDepartments.map((department, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedNewDepartments.includes(department.name)}
                onChange={() => handleSelectNewDepartment(department.name)}
              />
              {department.name}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleUpdate}
        disabled={
          selectedDepartments.length === 0 &&
          selectedNewDepartments.length === 0
        }
      >
        Update
      </button>
      {message && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>{message}</div>
      )}
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "90%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
};

const columnStyle = {
  flex: 1,
  marginRight: "20px",
  overflowY: "auto",
  maxHeight: "80%",
};

export default DepartmentManager;
