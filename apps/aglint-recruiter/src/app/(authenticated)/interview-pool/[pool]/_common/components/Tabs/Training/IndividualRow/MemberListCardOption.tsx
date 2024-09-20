"use client";

import { ArrowUpFromLine, Pause, Play, Trash2 } from "lucide-react";

import UITypography from "@/components/Common/UITypography";

export function MemberListCardOption({
  onClickMoveToQualifier ,
  isMoveToQualifierVisible = true,
  onClickPauseInterview ,
  isPauseVisible = true,
  onClickResumeInterview ,
  isResumeVisible = true,
  onClickRemoveModule ,
  isRemoveVisible = true,
}) {
  return (
    <div className="z-2 block w-fit p-2 bg-white rounded-sm">
      {isMoveToQualifierVisible && (
        <div
          className="flex cursor-pointer items-center gap-2 p-2 rounded transition-all duration-200 ease hover:bg-neutral-300 hover:text-neutral-900"
          {...onClickMoveToQualifier}
        >
          <ArrowUpFromLine size={16}/>
          <UITypography variant="p" type="small">
            Move to qualified
          </UITypography>
        </div>
      )}
      {isPauseVisible && (
        <div
          className="flex cursor-pointer items-center gap-2 p-2 rounded transition-all duration-200 ease hover:bg-neutral-300 hover:text-neutral-900"
          {...onClickPauseInterview}
        >
        <Pause size={16}/>
          <UITypography variant="p" type="small">
            Pause
          </UITypography>
        </div>
      )}
      {isResumeVisible && (
        <div
          className="flex cursor-pointer items-center gap-2 p-2 rounded transition-all duration-200 ease hover:bg-neutral-300 hover:text-neutral-900"
          {...onClickResumeInterview}
        >
            <Play size={16}/>   
          <UITypography variant="p" type="small">
            Resume
          </UITypography>
        </div>
      )}
      {isRemoveVisible && (
        <div
          className="flex cursor-pointer items-center gap-2 p-2 rounded transition-all duration-200 ease hover:bg-neutral-300 hover:text-neutral-900"
          {...onClickRemoveModule}
        >
          <Trash2 size={16} className="text-red-600"/>
          <UITypography variant="p" type="small">
            Remove
          </UITypography>
        </div>
      )}
    </div>
  );
}