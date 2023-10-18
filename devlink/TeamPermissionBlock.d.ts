import * as React from "react";
import * as Types from "./types";

declare function TeamPermissionBlock(props: {
  as?: React.ElementType;
  isEnabled?: Types.Visibility.VisibilityConditions;
  description?: React.ReactNode;
  slotToggle?: Types.Devlink.Slot;
}): React.JSX.Element;
