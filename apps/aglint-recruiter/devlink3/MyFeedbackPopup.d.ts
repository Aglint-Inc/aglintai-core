import * as React from "react";
import * as Types from "./types";

declare function MyFeedbackPopup(props: {
  as?: React.ElementType;
  slotRoundedNumber?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotObjective?: Types.Devlink.Slot;
  textRecommendation?: React.ReactNode;
  onClickSubmitFeedback?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
