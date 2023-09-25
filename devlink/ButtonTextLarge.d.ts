import * as React from "react";
import * as Types from "./types";

declare function ButtonTextLarge(props: {
  as?: React.ElementType;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  slotStartIcon?: Types.Devlink.Slot;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  textLabel?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
}): React.JSX.Element;
