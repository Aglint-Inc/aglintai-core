import * as React from "react";
import * as Types from "./types";

declare function TopApplicantsTable(props: {
  as?: React.ElementType;
  slotList?: Types.Devlink.Slot;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  isAllSelected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
