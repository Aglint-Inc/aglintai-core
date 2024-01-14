import * as React from "react";
import * as Types from "./types";

declare function ScoreSetting(props: {
  as?: React.ElementType;
  slotScoreCardDetails?: Types.Devlink.Slot;
  slotScoreWeight?: Types.Devlink.Slot;
  isAddJob?: Types.Visibility.VisibilityConditions;
  onClickDone?: Types.Devlink.RuntimeProps;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  slotBasicButton?: Types.Devlink.Slot;
  onClickSaveDraft?: Types.Devlink.RuntimeProps;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isEmptyWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
