import * as React from "react";
import * as Types from "./types";

declare function ButtonFilter(props: {
  as?: React.ElementType;
  onClickStatus?: Types.Devlink.RuntimeProps;
  slotLeftIcon?: Types.Devlink.Slot;
  slotRightIcon?: Types.Devlink.Slot;
  textLabel?: React.ReactNode;
  isDotVisible?: Types.Visibility.VisibilityConditions;
  isActive?: Types.Visibility.VisibilityConditions;
  fontSize?: Types.Builtin.Text;
}): React.JSX.Element;
