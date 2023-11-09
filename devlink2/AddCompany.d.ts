import * as React from "react";
import * as Types from "./types";

declare function AddCompany(props: {
  as?: React.ElementType;
  onclickClose?: Types.Devlink.RuntimeProps;
  slotWebsiteInput?: Types.Devlink.Slot;
  onclickChangeButton?: Types.Devlink.RuntimeProps;
  slotCompanyDetails?: Types.Devlink.Slot;
  slotLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
