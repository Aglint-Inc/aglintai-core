import * as React from "react";
import * as Types from "./types";

declare function ButtonSuccessLarge(props: {
  as?: React.ElementType;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  slotStartIcon?: Types.Devlink.Slot;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  textLabel?: React.ReactNode;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
}): React.JSX.Element;
