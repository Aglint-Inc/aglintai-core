import * as React from "react";
import * as Types from "./types";

declare function InboxContactSupport(props: {
  as?: React.ElementType;
  textJobRole?: React.ReactNode;
  textJobCompanyLocations?: React.ReactNode;
  slotFormSupport?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
  onClickReport?: Types.Devlink.RuntimeProps;
  isTicketSubmitSuccessfully?: Types.Visibility.VisibilityConditions;
  onClickCopyLinkToTicket?: Types.Devlink.RuntimeProps;
  slotLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
