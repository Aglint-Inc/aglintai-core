import * as React from "react";
import * as Types from "./types";

declare function ButtonTextRegular(props: {
  as?: React.ElementType;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  slotStartIcon?: Types.Devlink.Slot;
  textLabel?: React.ReactNode;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
}): React.JSX.Element;
