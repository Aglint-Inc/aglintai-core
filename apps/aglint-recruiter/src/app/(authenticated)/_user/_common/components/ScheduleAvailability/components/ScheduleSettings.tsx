"use client";
import React from "react";

export function ScheduleSettings({
  slotTimeZoneInput,
  slotDailyLimit,
  slotWeeklyLimit,
  slotWorkingHourDay,
  onClickDiscard = {},
  onClickUpdateChanges = {},
  slotKeywordCard,
  isKeywordVisible = false,
  isCompanyLevelVisible = true,
}) {
  return (
    <div className="flex flex-col max-w-2xl gap-5 bg-white">
      {isKeywordVisible && (
        <div className="flex flex-col gap-5">
          {isCompanyLevelVisible && (
            <div className="flex flex-col gap-1 w-[620px]">
              <div className="font-semibold">Keywords</div>
              <div className="text-gray-600">
                Keywords allow you to identify events on interviewer’s calendars that can be scheduled over by either you or a candidate when booking interviews.
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3 w-[658px] mt-5">
            {slotKeywordCard}
          </div>
        </div>
      )}
      {isCompanyLevelVisible && (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p >
              Set up recruiting time ranges and available working hours
            </p>
            <p >
              Availability
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-red-500 cursor-pointer" {...onClickDiscard}>
              Discard
            </div>
            <div className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer" {...onClickUpdateChanges}>
              Update Changes
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p>
          Time Zone
        </p>
        <div className="flex flex-col-reverse gap-2">
          {slotTimeZoneInput}
        </div>
              </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p >
            Interview Load
          </p>
          <p>
            Setup maximum interviews per day and week.
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-[370px]">
          <p>
            Daily Limit
          </p>
          <div className="flex flex-col gap-1">
            {slotDailyLimit}
          </div>
          <div className="mt-2">
            <p>
              Weekly Limit
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {slotWeeklyLimit}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p>
            Setup working hour across company level.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[700px]">
          {slotWorkingHourDay}
        </div>
      </div>
      
    </div>
  );
}