import * as React from "react";
import * as Types from "./types";

declare function SchedulingFlow(props: {
  as?: React.ElementType;
  slotInputName?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  slotDateRangeInput?: Types.Devlink.Slot;
  slotPlanCard?: Types.Devlink.Slot;
  onClickJobSettings?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
