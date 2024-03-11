import * as React from "react";
import * as Types from "./types";

declare function OptionAvailable(props: {
  as?: React.ElementType;
  textTime?: React.ReactNode;
  textTitle?: React.ReactNode;
  slotMember?: Types.Devlink.Slot;
  isBreakVisible?: Types.Visibility.VisibilityConditions;
  textBreakTime?: React.ReactNode;
  isTitleVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
