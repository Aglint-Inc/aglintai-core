import React, { useState } from "react";
import UpdateEmailAuth from "./UpdateEmailAuth";
import { seedTabs } from "../../type/UITypes";
import Jobs from "./Jobs";
import Company from "./company/Company";
import { InterviewModules } from "./InterviewModules";
import User from "./User";

const navTabs: {
  name: string;
  value: seedTabs;
}[] = [
  {
    name: "Company",
    value: "company",
  },
  {
    name: "User",
    value: "user",
  },
  {
    name: "Jobs",
    value: "jobs",
  },
  {
    name: "Interview Type",
    value: "interview_type",
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
        {tab === "user" && <User />}
        {tab === "interview_type" && <InterviewModules />}
        {tab === "jobs" && <Jobs />}
      </div>
    </div>
  );
}

export default Seed;
