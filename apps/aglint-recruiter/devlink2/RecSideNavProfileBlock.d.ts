import * as React from "react";
import * as Types from "./types";

declare function RecSideNavProfileBlock(props: {
  as?: React.ElementType;
  slotCompanyList?: Types.Devlink.Slot;
  onclickAdd?: Types.Devlink.RuntimeProps;
  backdropProps?: Types.Devlink.RuntimeProps;
  onclickDropdown?: Types.Devlink.RuntimeProps;
  isDropdownBodyVisible?: Types.Visibility.VisibilityConditions;
  slotSelectedCompanyLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
