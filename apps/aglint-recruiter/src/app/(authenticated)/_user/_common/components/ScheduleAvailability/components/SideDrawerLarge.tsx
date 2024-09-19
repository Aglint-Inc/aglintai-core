"use client";
import React from "react";

export function SideDrawerLarge({
  slotSideDrawerbody,
  onClickCancel,
  textDrawertitle,
  slotButtons,
  drawerSize,
}) {
  return (
    <div
      className={`relative overflow-hidden ${drawerSize === "small" ? "w-[450px]" : drawerSize === "medium" ? "w-[460px]" : "w-[800px]"} h-screen bg-white`}
    >
      <div className="flex h-12 px-4 py-2 justify-between items-center border-b border-neutral-600">
        <div className="flex items-center gap-2">
    
          <p className="text-sm">
            {textDrawertitle}
          </p>
        </div>
        <button
          className="p-2 text-neutral-700 bg-neutral-200 rounded"
          onClick={onClickCancel}
        >
          Close
        </button>
      </div>
      <div className={`overflow-auto h-[calc(100vh-97px)]`}>
        {slotSideDrawerbody }
      </div>
     
        <div className="absolute left-0 right-0 bottom-0 z-2 grid p-4 gap-4 grid-cols-2 border-t border-neutral-600 bg-white">
          {slotButtons}
        </div>
      
    </div>
  );
}