import * as React from "react";
import * as Types from "./types";

declare function InterviewMembersCard(props: {
  as?: React.ElementType;
  slotMemberImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  isTrainingProgressVisible?: Types.Visibility.VisibilityConditions;
  isTrainingVisible?: Types.Visibility.VisibilityConditions;
  isTrainingCompletedVisible?: Types.Visibility.VisibilityConditions;
  onClickViewProgress?: Types.Devlink.RuntimeProps;
  onClickApproveCandidate?: Types.Devlink.RuntimeProps;
  onClickViewHistory?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
