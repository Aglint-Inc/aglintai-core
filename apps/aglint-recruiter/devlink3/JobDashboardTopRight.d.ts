import * as React from "react";
import * as Types from "./types";

declare function JobDashboardTopRight(props: {
  as?: React.ElementType;
  slotJobStatus?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
  slotCloseJobButton?: Types.Devlink.Slot;
  isPublish?: Types.Visibility.VisibilityConditions;
  isEditError?: Types.Visibility.VisibilityConditions;
  slotPublishButton?: Types.Devlink.Slot;
  slotAddCandidateButton?: Types.Devlink.Slot;
}): React.JSX.Element;
