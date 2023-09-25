import * as React from "react";
import * as Types from "./types";

declare function ButtonTextSmall(props: {
  as?: React.ElementType;
  slotStartIcon?: Types.Devlink.Slot;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  textLabel?: React.ReactNode;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
}): React.JSX.Element;
