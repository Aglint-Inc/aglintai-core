import * as React from "react";
import * as Types from "./types";

declare function InterviewpanelPill(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  isSelected?: Types.Visibility.VisibilityConditions;
  isOptional?: Types.Visibility.VisibilityConditions;
  isNotSelected?: Types.Visibility.VisibilityConditions;
  onClickPill?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
