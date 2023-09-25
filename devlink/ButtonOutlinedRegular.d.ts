import * as React from "react";
import * as Types from "./types";

declare function ButtonOutlinedRegular(props: {
  as?: React.ElementType;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  textLabel?: React.ReactNode;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  slotStartIcon?: Types.Devlink.Slot;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
