import * as React from "react";
import * as Types from "./types";

declare function ScreeningWelcome(props: {
  as?: React.ElementType;
  onclickEdit?: Types.Devlink.RuntimeProps;
  editHeading?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
  tooltipText?: React.ReactNode;
  onclickClose?: Types.Devlink.RuntimeProps;
  isCloseVisible?: Types.Visibility.VisibilityConditions;
  isEditButtonVisible?: Types.Visibility.VisibilityConditions;
  slotWarnings?: Types.Devlink.Slot;
  isEnd?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
