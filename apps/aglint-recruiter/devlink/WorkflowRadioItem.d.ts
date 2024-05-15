import * as React from "react";
import * as Types from "./types";

declare function WorkflowRadioItem(props: {
  as?: React.ElementType;
  onClick?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotScore?: Types.Devlink.Slot;
  radioText?: React.ReactNode;
}): React.JSX.Element;
