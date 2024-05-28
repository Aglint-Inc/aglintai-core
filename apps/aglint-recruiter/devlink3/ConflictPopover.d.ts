import * as React from "react";
import * as Types from "./types";

declare function ConflictPopover(props: {
  as?: React.ElementType;
  isOutsideWorkHours?: Types.Visibility.VisibilityConditions;
  isSoftConflict?: Types.Visibility.VisibilityConditions;
  isHardConflict?: Types.Visibility.VisibilityConditions;
  slotConflictReason?: Types.Devlink.Slot;
}): React.JSX.Element;
