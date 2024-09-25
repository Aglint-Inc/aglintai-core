import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { interviewType, module } from "../../type/UITypes";

export const InterviewModules = () => {
  const [modules, setModules] = useState<interviewType[]>([]);
  const [newModules, setNewModules] = useState<module[]>([]);
  const [selectedModules, setSelectedModules] = useState<interviewType[]>([]);
  const [selectedNewModules, setSelectedNewModules] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const supabase = window.supabase;
  const { recruiterId: recruiter_id } = useAppContext();
  const [isLoading, setLoading] = useState(true);

  const fetchModules = async () => {
    try {
      setLoading(true);
      //avaliable modules
      const response = await fetch(
        "https://aglintai-seed-data.vercel.app/company/interview_module.json"
      );
      const newModules = await response.json();

      //current modules
      const { data }: { data: interviewType[] } = await supabase
        .from("interview_module")
        .select("*")
        .eq("recruiter_id", recruiter_id);

      const currentModules = data.filter((d) => !d.is_archived);
      setNewModules(newModules);
      setModules(currentModules);
    } catch (error) {
      console.error("Error fetching interview modules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSelectnewModule = (name: string) => {
    setSelectedNewModules((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((moduleName) => moduleName !== name)
        : [...prevSelected, name]
    );
  };

  // const handleSelectModule = (id: string) => {
  //   setSelectedModules((prevSelected) =>
  //     prevSelected.map((pre) => pre.id).includes(id)
  //       ? prevSelected.filter((module) => module.id !== id)
  //       : [...prevSelected, ...modules.filter((mod) => mod.id === id)]
  //   );
  // };

  function pickRandomElement(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const addModules = async () => {
    const data = (
      await supabase
        .from("departments")
        .select()
        .eq("recruiter_id", recruiter_id)
    ).data;

    const departments = data.map((dep: any) => dep.id);

    const modulesToInsert = newModules
      .filter((module) => selectedNewModules.includes(module.name))
      .map((module) => ({
        name: module.name,
        description: module.objective,
        instructions: module.instructions,
        is_archived: false,
        recruiter_id,
        department_id: pickRandomElement(departments),
      }));

    if (!modulesToInsert?.length) return;

    const { error } = await supabase
      .from("interview_module")
      .insert(modulesToInsert);

    if (error) {
      setMessage((pre) => [...pre, "Error inserting modules."]);
    } else {
      setMessage((pre) => [...pre, "Modules inserted successfully."]);
    }

    setSelectedNewModules([]);
  };

  // const deleteModules = async () => {
  //   const modulesToDelete = selectedModules.map((mod) => mod.id);
  //   if (!modulesToDelete?.length) return;

  //   const { error } = await supabase
  //     .from("interview_module")
  //     .delete()
  //     .in("id", modulesToDelete);

  //   if (error) {
  //     setMessage((pre) => [...pre, "Error deleting modules."]);
  //   } else {
  //     setMessage((pre) => [...pre, "Modules deleted successfully."]);
  //   }
  //   setSelectedModules([]);
  // };

  const handleAddSelectedModules = async () => {
    try {
      setLoading(true);
      setMessage([]);
      // await deleteModules();
      await addModules();
      await fetchModules();
    } finally {
      setLoading(false);
    }
  };

  const curModulesName = modules.map((mod) =>
    mod.name.toLowerCase().trim().replace(/\s+/g, "")
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ display: "flex" }}>
      <div>
        <div
          style={{
            display: "flex",
            gap: "50px",
          }}
        >
          <div>
            <h5 style={{ marginBottom: "5px" }}>
              Select Interview Types to add
            </h5>
            {newModules.length > 0 ? (
              <>
                {newModules
                  .filter(
                    (mod) =>
                      !curModulesName.includes(
                        mod.name.toLowerCase().trim().replace(/\s+/g, "")
                      )
                  )
                  .map((module) => (
                    <div
                      key={module.name}
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={() => handleSelectnewModule(module.name)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedNewModules.includes(module.name)}
                      />
                      <p>{module.name}</p>
                    </div>
                  ))}
                <button
                  onClick={handleAddSelectedModules}
                  style={{ marginTop: "10px" }}
                  disabled={
                    selectedNewModules.length === 0 &&
                    selectedModules.length === 0
                  }
                >
                  Add Interview Types
                </button>
              </>
            ) : (
              <p>no new modules found</p>
            )}
          </div>
        </div>
      </div>
      {message?.length ? (
        <div
          style={{
            marginLeft: "20px",
            paddingLeft: "20px",
            borderLeft: "1px solid grey",
          }}
        >
          <div>
            <h5>Console</h5>
            {message.map((mes) => (
              <p>{mes}</p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
