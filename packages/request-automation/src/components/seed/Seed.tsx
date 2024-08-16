import React, { useState } from "react";
import DepartmentManager from "./DepartmentManager";

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
];

type seedTabs = "department" | "email";

function Seed() {
  const [tab, setTab] = useState<seedTabs>("department");
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
      <div>{tab === "department" && <DepartmentManager />}</div>
    </div>
  );
}

export default Seed;
