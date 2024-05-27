import * as React from "react";
import * as Types from "./types";

declare function ConflictSoft(props: {
  as?: React.ElementType;
  textConflict?: React.ReactNode;
  slotConflictReason?: Types.Devlink.Slot;
  isHover?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
