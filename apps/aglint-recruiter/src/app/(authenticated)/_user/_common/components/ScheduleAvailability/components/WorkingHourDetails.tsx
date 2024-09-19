"use client";

export function WorkingHourDetails({
  slotDays,
}) {
  return (
    <div className="flex flex-col w-[600px] gap-2">
      <div className="flex items-center gap-1">
        <p className="text-sm">
          Working Hours
        </p>
      </div>
      <p className="text-sm text-neutral">
        Set your company's working hours to define the availability for interviews.
      </p>
      <div className="flex flex-col items-start gap-3 pt-1">
        {slotDays }
      </div>
    </div>
  );
}