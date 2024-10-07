import React from "react";
import { tabs } from "../../type/UITypes";
import InfoDisplay from "./InfoDisplay";
import { useAppContext } from "../../context/AppContext";

const Tabs: {
  name: string;
  value: tabs;
}[] = [
  {
    name: "Automation",
    value: "automation",
  },
  {
    name: "Seed",
    value: "seed",
  },
  {
    name: "Reset",
    value: "reset",
  },
  {
    name: "Mode",
    value: "mode",
  },
];

function Header({
  activeDiv,
  setActiveDiv,
}: {
  activeDiv: tabs;
  setActiveDiv: React.Dispatch<React.SetStateAction<tabs>>;
}) {
  const { getSupabaseSession, session } = useAppContext();
  return (
    <div id="header">
      <div className="flex-h">
        <div className="flex items-center gap-5">
          <span className="drawer-warning ">
            <strong>⚠️ Warning:</strong> This is a utility for testing not a
            product feature. <InfoDisplay />
          </span>

          {!session && <button onClick={getSupabaseSession}>Connect</button>}
        </div>
        <span>
          {Tabs.map((tab) => (
            <span
              className={activeDiv === tab.value ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveDiv(tab.value)}
            >
              {tab.name}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export default Header;
