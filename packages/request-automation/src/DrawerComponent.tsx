import React, { useState, useRef } from "react";

import Demo from "./components/demo/Demo";
import Header from "./components/header/Header";
import { tabs } from "./type/UITypes";
import Seed from "./components/seed/Seed";
import Clear from "./components/clear/Clear";

export const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeDiv, setActiveDiv] = useState<tabs>("demo");

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
        {activeDiv === "demo" && <Demo />}
        {activeDiv === "seed" && <Seed />}
        {activeDiv === "clear" && <Clear />}
      </div>
      <div className="drawer-handle" onClick={toggleDrawer}>
        {isOpen ? "↧" : "↥"}
      </div>
    </div>
  );
};
