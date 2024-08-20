import React from "react";
import { tabs } from "../../type/UITypes";
import InfoDisplay from "./InfoDisplay";

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
  return (
    <div id="header">
      <div className="flex-h">
        <span className="drawer-warning">
          <strong>⚠️ Warning:</strong> This is a utility for speeding up demos,
          not a product feature. <InfoDisplay />
        </span>

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
