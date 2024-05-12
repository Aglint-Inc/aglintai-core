import * as React from "react";
import * as Types from "./types";

declare function InterviewModuleCard(props: {
  as?: React.ElementType;
  textDuration?: React.ReactNode;
  textMemberSelection?: React.ReactNode;
  textModuleName?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
  slotAvatarWithName?: Types.Devlink.Slot;
  textInterviewModule?: React.ReactNode;
  isInterviewModuleVisible?: Types.Visibility.VisibilityConditions;
  slotOneMemberFrom?: Types.Devlink.Slot;
  slotTrainees?: Types.Devlink.Slot;
  textMemberfromCount?: React.ReactNode;
  isTraineeVisible?: Types.Visibility.VisibilityConditions;
  textPlatformName?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
