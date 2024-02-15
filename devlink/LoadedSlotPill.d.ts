import * as React from "react";
import * as Types from "./types";

declare function LoadedSlotPill(props: {
  as?: React.ElementType;
  textTime?: React.ReactNode;
  slotImage?: Types.Devlink.Slot;
  onClickPill?: Types.Devlink.RuntimeProps;
  isSelectedActive?: Types.Visibility.VisibilityConditions;
  isNotSelected?: Types.Visibility.VisibilityConditions;
  isLineBorderActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
