import * as React from "react";
import * as Types from "./types";

declare function FilterDropdown(props: {
  as?: React.ElementType;
  slotOption?: Types.Devlink.Slot;
  onClickReset?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  isRemoveVisible?: Types.Visibility.VisibilityConditions;
  link?: Types.Basic.Link;
  isResetVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
