import * as React from "react";
import * as Types from "./types";

declare function CompanyProfileHeader(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  companyName?: React.ReactNode;
  onclickCompany?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
