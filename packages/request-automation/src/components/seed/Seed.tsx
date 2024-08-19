import React, { useState } from "react";
import UpdateEmailAuth from "./UpdateEmailAuth";
import { seedTabs } from "../../type/UITypes";
import AddInterviewModules from "./AddInterviewModules";
import Jobs from "./Jobs";
import Company from "./company/Company";

const navTabs: {
  name: string;
  value: seedTabs;
}[] = [
  {
    name: "Company",
    value: "company",
  },
  {
    name: "Email",
    value: "email",
  },
  {
    name: "Interview Type",
    value: "interview_type",
  },
  {
    name: "Jobs",
    value: "jobs",
  },
];

function Seed() {
  const [tab, setTab] = useState<seedTabs>("company");
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
        {tab === "company" && <Company />}
        {tab === "email" && <UpdateEmailAuth />}
        {tab === "interview_type" && <AddInterviewModules />}
        {tab === "jobs" && <Jobs />}
      </div>
    </div>
  );
}

export default Seed;
