import * as React from "react";
import * as Types from "./types";

declare function ButtonSoft(props: {
  as?: React.ElementType;
  slotLoader?: Types.Devlink.Slot;
  isLoading?: Types.Visibility.VisibilityConditions;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
