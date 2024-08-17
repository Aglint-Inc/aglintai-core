import React, { useState } from "react";
import DepartmentManager from "./DepartmentManager";
import UpdateEmailAuth from "./UpdateEmailAuth";
import { seedTabs } from "../../type/UITypes";
import AddInterviewModules from "./AddInterviewModules";

const navTabs: {
  name: string;
  value: seedTabs;
}[] = [
  {
    name: "Department",
    value: "department",
  },
  {
    name: "Email",
    value: "email",
  },
  {
    name: "Interview Type",
    value: "interview_type",
  },
];

function Seed() {
  const [tab, setTab] = useState<seedTabs>("interview_type");
  return (
    <div id="seed">
      <div className="nav-menu">
        {navTabs.map((nav) => (
          <span
            onClick={() => setTab(nav.value)}
            className={` ${tab === nav.value ? "active" : ""}`}
          >
            {nav.name}
          </span>
        ))}
      </div>
      <div>
        {tab === "department" && <DepartmentManager />}
        {tab === "email" && <UpdateEmailAuth />}
        {tab === "interview_type" && <AddInterviewModules />}
      </div>
    </div>
  );
}

export default Seed;
