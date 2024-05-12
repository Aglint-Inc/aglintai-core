import * as React from "react";
import * as Types from "./types";

declare function ButtonAiRegular(props: {
  as?: React.ElementType;
  slotStartIcon?: Types.Devlink.Slot;
  slotEndIcon?: Types.Devlink.Slot;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  textLabel?: React.ReactNode;
  wrapperProps?: Types.Devlink.RuntimeProps;
  tabIndex?: Types.Builtin.Text;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
