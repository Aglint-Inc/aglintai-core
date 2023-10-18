import * as React from "react";
import * as Types from "./types";

declare function ResumeScoreSetting(props: {
  as?: React.ElementType;
  slotScore?: Types.Devlink.Slot;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isJobAdd?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
