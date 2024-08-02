import * as React from "react";
import * as Types from "./types";

declare function InterviewPlanDetail(props: {
  as?: React.ElementType;
  slotInterviewType?: Types.Devlink.Slot;
  slotPlanDetail?: Types.Devlink.Slot;
  slotBadge?: Types.Devlink.Slot;
  textMemberSelected?: React.ReactNode;
  slotCandidate?: Types.Devlink.Slot;
  slotRightButton?: Types.Devlink.Slot;
}): React.JSX.Element;
