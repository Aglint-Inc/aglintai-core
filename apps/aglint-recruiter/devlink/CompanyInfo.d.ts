import * as React from "react";
import * as Types from "./types";

declare function CompanyInfo(props: {
  as?: React.ElementType;
  slotAdditionalInfoForm?: Types.Devlink.Slot;
  onClickAddLocation?: Types.Devlink.RuntimeProps;
  onClickAddAvailableRoles?: Types.Devlink.RuntimeProps;
  onClickAddDepartments?: Types.Devlink.RuntimeProps;
  onClickAddTechStacks?: Types.Devlink.RuntimeProps;
  slotLocation?: Types.Devlink.Slot;
  slotDepartmentPills?: Types.Devlink.Slot;
  slotTechStackPills?: Types.Devlink.Slot;
  slotRolesPills?: Types.Devlink.Slot;
  isSpecialistVisible?: Types.Visibility.VisibilityConditions;
  isAvailableRolesVisible?: Types.Visibility.VisibilityConditions;
  slotEmploymentType?: Types.Devlink.Slot;
  isEditable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
