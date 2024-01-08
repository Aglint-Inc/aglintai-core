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
}): React.JSX.Element;
