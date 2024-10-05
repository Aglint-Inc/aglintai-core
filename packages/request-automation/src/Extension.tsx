import React, { useState, useRef, useEffect } from "react";

import Demo from "./components/demo/Demo";
import Header from "./components/header/Header";
import { tabs } from "./type/UITypes";
import Seed from "./components/seed/Seed";
import Reset from "./components/Reset/Reset";
import Mode from "./components/mode/Mode";
import { useAppContext } from "./context/AppContext";

export const Extension = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDiv, setActiveDiv] = useState<tabs>("seed");

  const drawerRef = useRef(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "i") {
      setIsOpen((pre) => !pre);
    }
  };

  const { session } = useAppContext();

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={drawerRef}
      className={`bottom-drawer-container ${isOpen ? "open" : ""}`}
    >
      <div className="bottom-drawer-content">
        <Header activeDiv={activeDiv} setActiveDiv={setActiveDiv} />
        {session && (
          <>
            {activeDiv === "automation" && <Demo />}
            {activeDiv === "seed" && <Seed />}
            {activeDiv === "reset" && <Reset />}
            {activeDiv === "mode" && <Mode />}
          </>
        )}
      </div>
      <div className="drawer-handle" onClick={() => setIsOpen((pre) => !pre)}>
        {isOpen ? "↧" : "↥"}
      </div>
    </div>
  );
};
