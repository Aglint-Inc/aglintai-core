import * as React from "react";
import * as Types from "./types";

declare function SidemenuLeft(props: {
  as?: React.ElementType;
  isDashboard?: Types.Visibility.VisibilityConditions;
  isJobs?: Types.Visibility.VisibilityConditions;
  isResume?: Types.Visibility.VisibilityConditions;
  isInterview?: Types.Visibility.VisibilityConditions;
  isCoach?: Types.Visibility.VisibilityConditions;
  onClickLogout?: Types.Devlink.RuntimeProps;
  textNotificationCount?: React.ReactNode;
  isNotificationCount?: Types.Visibility.VisibilityConditions;
  isPro?: Types.Visibility.VisibilityConditions;
  onClickDashboard?: Types.Devlink.RuntimeProps;
  onClickJobs?: Types.Devlink.RuntimeProps;
  onClickResume?: Types.Devlink.RuntimeProps;
  onClickInterview?: Types.Devlink.RuntimeProps;
  onClickCoach?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
  isSettings?: Types.Visibility.VisibilityConditions;
  isNotification?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
