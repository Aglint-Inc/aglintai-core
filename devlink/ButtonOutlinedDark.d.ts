import * as React from "react";
import * as Types from "./types";

declare function ButtonOutlinedDark(props: {
  as?: React.ElementType;
  textLabel?: React.ReactNode;
  wrapperProps?: Types.Devlink.RuntimeProps;
  isStartIcon?: Types.Visibility.VisibilityConditions;
  slotStartIcon?: Types.Devlink.Slot;
  isEndIcon?: Types.Visibility.VisibilityConditions;
  slotEndIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
