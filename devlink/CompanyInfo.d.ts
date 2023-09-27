import * as React from "react";
import * as Types from "./types";

declare function CompanyInfo(props: {
  as?: React.ElementType;
  slotBasicForm?: Types.Devlink.Slot;
  slotAdditionalInfoForm?: Types.Devlink.Slot;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickChangeLogo?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
