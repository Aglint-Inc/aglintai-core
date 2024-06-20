import * as React from "react";
import * as Types from "./types";

declare function Filter(props: {
  as?: React.ElementType;
  onClickAddFilter?: Types.Devlink.RuntimeProps;
  onClickApplyFilter?: Types.Devlink.RuntimeProps;
  slotFilter?: Types.Devlink.Slot;
  isApplyFilterDisable?: Types.Visibility.VisibilityConditions;
  isFilterEmpty?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
