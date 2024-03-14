import * as React from "react";
import * as Types from "./types";

declare function ScoreSetting(props: {
  as?: React.ElementType;
  slotScoreCardDetails?: Types.Devlink.Slot;
  isEmptyWarningVisible?: Types.Visibility.VisibilityConditions;
  onClickDismiss?: Types.Devlink.RuntimeProps;
  onClickRegenerate?: Types.Devlink.RuntimeProps;
  isRegenerateVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
