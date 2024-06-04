import * as React from "react";
import * as Types from "./types";

declare function ButtonOutlined(props: {
  as?: React.ElementType;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  slotLoader?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
}): React.JSX.Element;
