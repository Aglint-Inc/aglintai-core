import * as React from "react";
import * as Types from "./types";

declare function InterviewMemberList(props: {
  as?: React.ElementType;
  textObjective?: React.ReactNode;
  textDepartment?: React.ReactNode;
  slotNewTabPill?: Types.Devlink.Slot;
  slotModuleContent?: Types.Devlink.Slot;
  slotEditButton?: Types.Devlink.Slot;
  slotJobsCard?: Types.Devlink.Slot;
  slotBanner?: Types.Devlink.Slot;
  isBannerVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
