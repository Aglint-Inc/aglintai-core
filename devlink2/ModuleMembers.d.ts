import * as React from "react";
import * as Types from "./types";

declare function ModuleMembers(props: {
  as?: React.ElementType;
  onClickAddMember?: Types.Devlink.RuntimeProps;
  slotQualifiedMemberList?: Types.Devlink.Slot;
  onClickAddTrainee?: Types.Devlink.RuntimeProps;
  slotMembersInTraining?: Types.Devlink.Slot;
  isMembersTrainingVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
