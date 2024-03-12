import * as React from "react";
import * as Types from "./types";

declare function ScheduleOptions(props: {
  as?: React.ElementType;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  slotInputName?: Types.Devlink.Slot;
  slotDateRangeInput?: Types.Devlink.Slot;
  slotPrimaryButton?: Types.Devlink.Slot;
}): React.JSX.Element;
