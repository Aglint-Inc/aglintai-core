import * as React from "react";
import * as Types from "./types";

declare function DefaultButton(props: {
  as?: React.ElementType;
  isPrimaryRegularVisible?: Types.Visibility.VisibilityConditions;
  isPrimaryLargeVisible?: Types.Visibility.VisibilityConditions;
  isAiRegularVisible?: Types.Visibility.VisibilityConditions;
  isAiLargeVisible?: Types.Visibility.VisibilityConditions;
  isDisableRegularVisible?: Types.Visibility.VisibilityConditions;
  isDisableLargeVisible?: Types.Visibility.VisibilityConditions;
  isFocusedVisible?: Types.Visibility.VisibilityConditions;
  slotStartIcon?: Types.Devlink.Slot;
  slotEndIcon?: Types.Devlink.Slot;
  textButton?: React.ReactNode;
  onClickProps?: Types.Devlink.RuntimeProps;
  isDangerRegularVisible?: Types.Visibility.VisibilityConditions;
  isDangerLargeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
