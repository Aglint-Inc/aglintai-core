"use client";
import React from "react";

export function InterviewLoadCard({
  textHeading  ,
  textInterviewCounts ,
  textLabel ,
}) {
  return (
    <div className="flex h-15 p-3 flex-col justify-center rounded-lg bg-neutral-300">
      <p >
        {textHeading}
      </p>
      <div className="flex justify-start items-center gap-1">
        <p >
          {textInterviewCounts}
        </p>
        <p >
          {textLabel}
        </p>
      </div>
    </div>
  );
}