import * as React from "react";
import * as Types from "./types";

declare function ResumeScoreSetting(props: {
  as?: React.ElementType;
  slotScore?: Types.Devlink.Slot;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isJobAdd?: Types.Visibility.VisibilityConditions;
  onClickDone?: Types.Devlink.RuntimeProps;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  onClickSaveDraft?: Types.Devlink.RuntimeProps;
  slotBasicButton?: Types.Devlink.Slot;
}): React.JSX.Element;
