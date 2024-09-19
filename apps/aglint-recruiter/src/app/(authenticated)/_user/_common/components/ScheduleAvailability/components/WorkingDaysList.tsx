"use client";

export function WorkingDaysList({
  textDay ,
  textTime,
}) {
  return (
    <div className="flex justify-start items-center gap-3">
      <div className="w-24 flex-none">
        <p className="text-sm">
          {textDay}
        </p>
      </div>
      <div className="flex-grow">
        <p className="text-sm">
          {textTime}
        </p>
      </div>
    </div>
  );
}