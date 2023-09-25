import * as React from "react";
import * as Types from "./types";

declare function DropdownEntry(props: {
  as?: React.ElementType;
  isNeutral?: Types.Visibility.VisibilityConditions;
  isPositive?: Types.Visibility.VisibilityConditions;
  isNegative?: Types.Visibility.VisibilityConditions;
  entryText?: React.ReactNode;
}): React.JSX.Element;
