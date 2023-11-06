import * as React from "react";
import * as Types from "./types";

declare function RecSideNavProfileBlock(props: {
  as?: React.ElementType;
  onclickCompany?: Types.Devlink.RuntimeProps;
  slotCompanyLogo?: Types.Devlink.Slot;
  companyName?: React.ReactNode;
  isNotCountVisible?: Types.Visibility.VisibilityConditions;
  onclickNotification?: Types.Devlink.RuntimeProps;
  notificationCount?: React.ReactNode;
  companyNameProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
