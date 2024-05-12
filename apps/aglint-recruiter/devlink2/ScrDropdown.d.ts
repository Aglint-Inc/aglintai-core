import * as React from "react";
import * as Types from "./types";

declare function ScrDropdown(props: {
  as?: React.ElementType;
  onclickMultiSelect?: Types.Devlink.RuntimeProps;
  onclickSingleSelect?: Types.Devlink.RuntimeProps;
  onclickShortAnswer?: Types.Devlink.RuntimeProps;
  slotSelectedIcon?: Types.Devlink.Slot;
  selectedText?: React.ReactNode;
  isOptionsBodyVisible?: Types.Visibility.VisibilityConditions;
  onclickTrigger?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
