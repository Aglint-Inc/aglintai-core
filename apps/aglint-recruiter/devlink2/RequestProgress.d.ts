import * as React from "react";
import * as Types from "./types";

declare function RequestProgress(props: {
  as?: React.ElementType;
  indicator?: Types.Builtin.Text;
  circleIndicator?: Types.Builtin.Text;
  slotIndicator?: Types.Devlink.Slot;
  slotProgress?: Types.Devlink.Slot;
  textRequestProgress?: React.ReactNode;
  isDividerVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
