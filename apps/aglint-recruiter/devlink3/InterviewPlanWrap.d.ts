import * as React from "react";
import * as Types from "./types";

declare function InterviewPlanWrap(props: {
  as?: React.ElementType;
  textStageName?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  textInterviewCount?: React.ReactNode;
  slotRightIconButton?: Types.Devlink.Slot;
  slotInputButton?: Types.Devlink.Slot;
  isInputVisible?: Types.Visibility.VisibilityConditions;
  slotInterviewPlanDetail?: Types.Devlink.Slot;
  isSlotInterviewPlanVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
