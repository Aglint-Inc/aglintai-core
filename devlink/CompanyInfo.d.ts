import * as React from "react";
import * as Types from "./types";

declare function CompanyInfo(props: {
  as?: React.ElementType;
  slotBasicForm?: Types.Devlink.Slot;
  slotAdditionalInfoForm?: Types.Devlink.Slot;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickChangeLogo?: Types.Devlink.RuntimeProps;
  textLogoUpdate?: React.ReactNode;
  onClickAddLocation?: Types.Devlink.RuntimeProps;
  onClickAddAvailableRoles?: Types.Devlink.RuntimeProps;
  onClickAddDepartments?: Types.Devlink.RuntimeProps;
  onClickAddTechStacks?: Types.Devlink.RuntimeProps;
  slotLocation?: Types.Devlink.Slot;
  slotDepartmentPills?: Types.Devlink.Slot;
  slotTechStackPills?: Types.Devlink.Slot;
  slotRolesPills?: Types.Devlink.Slot;
}): React.JSX.Element;
