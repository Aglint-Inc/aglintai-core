import * as React from "react";
import * as Types from "./types";

declare function BrowseScreeningPop(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotBrowseScreeningCard?: Types.Devlink.Slot;
  slotAddScreeningButton?: Types.Devlink.Slot;
  isAddScreeenButtonVisible?: Types.Visibility.VisibilityConditions;
  isEmpty?: Types.Visibility.VisibilityConditions;
  isNotEmpty?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
