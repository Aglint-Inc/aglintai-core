import * as React from "react";
import * as Types from "./types";

declare function CompanySwitchDropdown(props: {
  as?: React.ElementType;
  slotCurrentCompany?: Types.Devlink.Slot;
  onclickDropdown?: Types.Devlink.RuntimeProps;
  isDropdownBodyVisible?: Types.Visibility.VisibilityConditions;
  slotCompanyList?: Types.Devlink.Slot;
  onclickAddButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
