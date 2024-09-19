"use client";
import React from "react";

export function TimeRangeInput({
  slotStartTimeInput,
  slotEndTimeInput,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-72 min-h-9 items-center gap-1">
        <div className="w-full self-stretch rounded-lg bg-white">
          {slotStartTimeInput}
        </div>
        <div>{"to"}</div>
        <div className="w-full self-stretch rounded-lg bg-white">
          {slotEndTimeInput}
        </div>
      </div>
    </div>
  );
}