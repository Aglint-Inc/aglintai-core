import * as React from "react";
import * as Types from "./types";

declare function TableBodyCell(props: {
  as?: React.ElementType;
  slotTimeRanges?: Types.Devlink.Slot;
  textSelectedCount?: React.ReactNode;
  isSelectedCell?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
