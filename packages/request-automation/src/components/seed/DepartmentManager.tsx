import React, { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import { companyDepartmentType, departmentType } from "../../type/UITypes";
import { yellow } from "@mui/material/colors";

const DepartmentManager = () => {
  const { recruiterId: recruiter_id } = useAppContext();
  const supabase = window.supabase;
  const [departments, setDepartments] = useState<departmentType[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<
    companyDepartmentType[]
  >([]);
  const [selectedNewDepartments, setSelectedNewDepartments] = useState<
    string[]
  >([]);
  const [message, setMessage] = useState("");

  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .eq("recruiter_id", recruiter_id);
    if (error) {
      console.error("Error fetching departments:", error);
    } else {
      console.log(data);
      setDepartments(data);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [supabase, recruiter_id]);

  useEffect(() => {
    const fetchAvailableDepartments = async () => {
      try {
        const response = await fetch(
          "https://aglintai-seed-data.vercel.app/company/departments.json"
        );
        const data: companyDepartmentType[] = await response.json();

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

  const handleSelectDepartment = (id: number) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((deptId) => deptId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectNewDepartment = (name: any) => {
    setSelectedNewDepartments((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((deptName) => deptName !== name)
        : [...prevSelected, name]
    );
  };

  const handleUpdate = async () => {
    let success = true;
    const usedNewDepartments = [];

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
      setTimeout(() => setMessage(""), 3000);
      setSelectedDepartments([]);
      setSelectedNewDepartments([]);
      fetchDepartments();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h5>Existing</h5>
          {departments.map((department) => (
            <div
              key={department.id}
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => handleSelectDepartment(department.id)}
            >
              <input
                type="checkbox"
                checked={selectedDepartments.includes(department.id)}
              />
              {department.name}
            </div>
          ))}
        </div>

        <div>
          <h5>Available to Add</h5>

          {availableDepartments.map((department, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => handleSelectNewDepartment(department.name)}
            >
              <input
                type="checkbox"
                checked={selectedNewDepartments.includes(department.name)}
              />
              {department.name}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleUpdate}
        style={{
          marginTop: "10px",
        }}
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

export default DepartmentManager;
