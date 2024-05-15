import * as React from "react";
import * as Types from "./types";

declare function StepBottomProgress(props: {
  as?: React.ElementType;
  onClickBack?: Types.Devlink.RuntimeProps;
  onClickContinue?: Types.Devlink.RuntimeProps;
  slotProgressBar?: Types.Devlink.Slot;
  textStepCount?: React.ReactNode;
  onClickSkip?: Types.Devlink.RuntimeProps;
  isSkipButtonVisible?: Types.Visibility.VisibilityConditions;
  isBackVisible?: Types.Visibility.VisibilityConditions;
  slotSaveStatus?: Types.Devlink.Slot;
}): React.JSX.Element;
