"use client";
import React from "react";

export function InterviewLoadDetails({
  slotInterviewLoadCard,
}) {
  return (
    <div className="flex flex-col w-600px space-y-2">
      <div className="flex items-center space-x-1">
        <p >
          Interview Load
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {slotInterviewLoadCard }
      </div>
    </div>
  );
}