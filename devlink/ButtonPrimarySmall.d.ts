import * as React from "react";
import * as Types from "./types";

declare function ButtonPrimarySmall(props: {
  as?: React.ElementType;
  slotStartIcon?: Types.Devlink.Slot;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  textLabel?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
}): React.JSX.Element;
