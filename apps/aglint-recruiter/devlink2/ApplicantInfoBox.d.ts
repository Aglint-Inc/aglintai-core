import * as React from "react";
import * as Types from "./types";

declare function ApplicantInfoBox(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  slotImage?: Types.Devlink.Slot;
  onClickLinkedIn?: Types.Devlink.RuntimeProps;
  isLinkedInVisible?: Types.Visibility.VisibilityConditions;
  textDepartment?: React.ReactNode;
  textLocation?: React.ReactNode;
  textTimeZone?: React.ReactNode;
  textEmail?: React.ReactNode;
  textRole?: React.ReactNode;
  textPhone?: React.ReactNode;
  slotEditButton?: Types.Devlink.Slot;
  isRoleVisible?: Types.Visibility.VisibilityConditions;
  isDepartmentVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
