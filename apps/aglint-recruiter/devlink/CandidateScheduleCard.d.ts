import * as React from "react";
import * as Types from "./types";

declare function CandidateScheduleCard(props: {
  as?: React.ElementType;
  textPopupTitle?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  isPopup?: Types.Visibility.VisibilityConditions;
  textDay?: React.ReactNode;
  slotSessionInfo?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  onClickCard?: Types.Devlink.RuntimeProps;
  isTitle?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
