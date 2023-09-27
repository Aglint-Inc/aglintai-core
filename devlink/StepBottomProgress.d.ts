import * as React from "react";
import * as Types from "./types";

declare function StepBottomProgress(props: {
  as?: React.ElementType;
  onClickBack?: Types.Devlink.RuntimeProps;
  onClickContinue?: Types.Devlink.RuntimeProps;
  slotProgressBar?: Types.Devlink.Slot;
  textStepCount?: React.ReactNode;
  isDraftSaved?: Types.Visibility.VisibilityConditions;
  isSavetoDraftVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
