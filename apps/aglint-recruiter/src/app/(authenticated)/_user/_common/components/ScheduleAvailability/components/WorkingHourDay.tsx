"use client";
import React from "react";

export function WorkingHourDay({
  slotRcCheckbox,
  slotTimeRageInput,
  isApplytoAll = false,
}) {
  return (
    <div className="grid min-h-[52px] p-2.5 align-start grid-cols-[120px_1fr_1fr] gap-2.5 rounded-lg">
      <div className="flex pt-2 items-center gap-1.5">
        {slotRcCheckbox }
      </div>
      <div className="flex flex-col gap-2.5">
        {slotTimeRageInput}
      </div>
      {isApplytoAll ? (
        <div className="hidden pt-2 justify-end items-center gap-1.5 opacity-0 text-[#337fbd] cursor-pointer">
          <div className="flex justify-start items-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1484 3.39844L6.39844 7.14844C6.13281 7.36719 5.86719 7.36719 5.60156 7.14844L3.72656 5.27344C3.50781 5.00781 3.50781 4.74219 3.72656 4.47656C3.99219 4.25781 4.25781 4.25781 4.52344 4.47656L6 5.95312L9.35156 2.60156C9.61719 2.38281 9.88281 2.38281 10.1484 2.60156C10.3672 2.86719 10.3672 3.13281 10.1484 3.39844ZM12.5859 6.21094L6.39844 12.3984C6.13281 12.6172 5.86719 12.6172 5.60156 12.3984L2.41406 9.21094C2.19531 8.94531 2.19531 8.67969 2.41406 8.41406C2.67969 8.19531 2.94531 8.19531 3.21094 8.41406L6 11.2031L11.7891 5.41406C12.0547 5.19531 12.3203 5.19531 12.5859 5.41406C12.8047 5.67969 12.8047 5.94531 12.5859 6.21094Z"
                fill="#337FBD"
              />
            </svg>
          </div>
          <div>Apply to all working days</div>
        </div>
      ) : null}
    </div>
  );
}