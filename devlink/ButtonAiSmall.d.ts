import * as React from "react";
import * as Types from "./types";

declare function ButtonAiSmall(props: {
  as?: React.ElementType;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  slotStartIcon?: Types.Devlink.Slot;
  textLabel?: React.ReactNode;
  wrapperProps?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
  tabIndex?: Types.Builtin.Text;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
