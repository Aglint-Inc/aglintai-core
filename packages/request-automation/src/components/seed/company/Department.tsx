import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { companyDepartmentType, departmentType } from "../../../type/UITypes";

export const Department = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { recruiterId: recruiter_id } = useAppContext();
  const supabase = window.supabase;
  const [availableDepartments, setAvailableDepartments] = useState<
    companyDepartmentType[]
  >([]);
  const [selectedNewDepartments, setSelectedNewDepartments] = useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const { data: curDep, error }: { data: departmentType[]; error: any } =
        await supabase
          .from("departments")
          .select("*")
          .eq("recruiter_id", recruiter_id);
      if (error) {
        console.error("Error fetching departments:", error);
      }
      const response = await fetch(
        "https://aglintai-seed-data.vercel.app/company/departments.json"
      );
      const newDep: companyDepartmentType[] = await response.json();

      const existingNames = curDep.map((dept) => dept.name.toLowerCase());
      const avaDep = newDep.filter(
        (dept) => !existingNames.includes(dept.name.toLowerCase())
      );

      setAvailableDepartments(avaDep);
    } catch (error) {
      console.error("Error fetching available departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [supabase, recruiter_id]);

  const handleSelectNewDepartment = (name: any) => {
    setSelectedNewDepartments((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((deptName) => deptName !== name)
        : [...prevSelected, name]
    );
  };

  const handleUpdate = async () => {
    setMessage([]);
    let success = true;

    const departmentToAdd = selectedNewDepartments.map((name) => ({
      name,
      recruiter_id,
    }));

    if (departmentToAdd.length > 0) {
      const { error } = await supabase
        .from("departments")
        .insert(departmentToAdd);

      if (error) {
        setMessage((pre) => [
          ...pre,
          `Error adding department ${error.message}`,
        ]);
      }
    }
    setMessage((pre) => [...pre, "Departments updated successfully."]);
    setSelectedNewDepartments([]);
    fetchDepartments();
  };

  return (
    <div style={{ minWidth: "200px" }}>
      {isLoading ? (
        <p>Department Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5>Select Departments to add</h5>

            {availableDepartments.length ? (
              <>
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
                <button
                  onClick={handleUpdate}
                  style={{
                    marginTop: "10px",
                  }}
                  disabled={selectedNewDepartments.length === 0}
                >
                  Add Departments
                </button>
              </>
            ) : (
              "No departments Available"
            )}
          </div>
        </div>
      )}
    </div>
  );
};
