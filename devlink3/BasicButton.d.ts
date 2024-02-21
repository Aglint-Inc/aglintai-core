import * as React from "react";
import * as Types from "./types";

declare function BasicButton(props: {
  as?: React.ElementType;
  isPrimaryRegularVisible?: Types.Visibility.VisibilityConditions;
  isPrimaryLargeVisible?: Types.Visibility.VisibilityConditions;
  isRedRegularVisible?: Types.Visibility.VisibilityConditions;
  isRedLargeVisible?: Types.Visibility.VisibilityConditions;
  isAiRegularVisible?: Types.Visibility.VisibilityConditions;
  isAiLargeVisible?: Types.Visibility.VisibilityConditions;
  isDarkRegularVisible?: Types.Visibility.VisibilityConditions;
  isDarkLargeVisible?: Types.Visibility.VisibilityConditions;
  onClickProps?: Types.Devlink.RuntimeProps;
  slotStartIcon?: Types.Devlink.Slot;
  slotEndIcon?: Types.Devlink.Slot;
  textButton?: React.ReactNode;
  isDisableRegularVisible?: Types.Visibility.VisibilityConditions;
  isDisableLargeVisible?: Types.Visibility.VisibilityConditions;
  isFocusedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
