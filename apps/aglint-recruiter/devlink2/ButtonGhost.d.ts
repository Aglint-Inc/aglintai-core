import * as React from "react";
import * as Types from "./types";

declare function ButtonGhost(props: {
  as?: React.ElementType;
  onClickButton?: Types.Devlink.RuntimeProps;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  slotLoader?: Types.Devlink.Slot;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  slotIcon?: Types.Devlink.Slot;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
