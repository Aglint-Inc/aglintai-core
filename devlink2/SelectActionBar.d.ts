import * as React from "react";
import * as Types from "./types";

declare function SelectActionBar(props: {
  as?: React.ElementType;
  onClickClear?: Types.Devlink.RuntimeProps;
  textSelected?: React.ReactNode;
  selectAllText?: React.ReactNode;
  isSelectAllVisible?: Types.Visibility.VisibilityConditions;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  slotDropdown?: Types.Devlink.Slot;
}): React.JSX.Element;
