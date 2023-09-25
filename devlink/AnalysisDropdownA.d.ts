import * as React from "react";
import * as Types from "./types";

declare function AnalysisDropdownA(props: {
  as?: React.ElementType;
  dropdownTitle?: React.ReactNode;
  dropdownDescription?: React.ReactNode;
  slotEntries?: Types.Devlink.Slot;
  isPositive?: Types.Visibility.VisibilityConditions;
  isNegative?: Types.Visibility.VisibilityConditions;
  isNeutral?: Types.Visibility.VisibilityConditions;
  overviewText?: React.ReactNode;
  overviewProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
