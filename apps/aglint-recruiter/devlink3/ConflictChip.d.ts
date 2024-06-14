import * as React from "react";
import * as Types from "./types";

declare function ConflictChip(props: {
  as?: React.ElementType;
  textCount?: React.ReactNode;
  isOutsideWorkHours?: Types.Visibility.VisibilityConditions;
  isHardConflict?: Types.Visibility.VisibilityConditions;
  isSoftConflict?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
