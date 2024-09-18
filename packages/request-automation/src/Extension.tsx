import React, { useState, useRef } from "react";

import Demo from "./components/demo/Demo";
import Header from "./components/header/Header";
import { tabs } from "./type/UITypes";
import Seed from "./components/seed/Seed";
import Reset from "./components/Reset/Reset";
import Mode from "./components/mode/Mode";

export const Extension = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDiv, setActiveDiv] = useState<tabs>("seed");

  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={drawerRef}
      className={`bottom-drawer-container ${isOpen ? "open" : ""}`}
    >
      <div className="bottom-drawer-content">
        <Header activeDiv={activeDiv} setActiveDiv={setActiveDiv} />
        {activeDiv === "automation" && <Demo />}
        {activeDiv === "seed" && <Seed />}
        {activeDiv === "reset" && <Reset />}
        {activeDiv === "mode" && <Mode />}
      </div>
      <div className="drawer-handle" onClick={toggleDrawer}>
        {isOpen ? "↧" : "↥"}
      </div>
    </div>
  );
};
