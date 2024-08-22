import * as React from "react";
import * as Types from "./types";

declare function ApplicantDetailStage(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textInterviewCount?: React.ReactNode;
  onClickDrop?: Types.Devlink.RuntimeProps;
  slotInterviewStageDetail?: Types.Devlink.Slot;
  isInterviewStageDetailVisible?: Types.Visibility.VisibilityConditions;
  isCountVisible?: Types.Visibility.VisibilityConditions;
  slotScheduleButton?: Types.Devlink.Slot;
  isScheduleButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
