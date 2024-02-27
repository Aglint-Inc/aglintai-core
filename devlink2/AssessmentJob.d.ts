import * as React from "react";
import * as Types from "./types";

declare function AssessmentJob(props: {
  as?: React.ElementType;
  slotAssessmentCard?: Types.Devlink.Slot;
  slotInstructions?: Types.Devlink.Slot;
  slotRight?: Types.Devlink.Slot;
  slotAssessmentList?: Types.Devlink.Slot;
  onClickBrowseTemplates?: Types.Devlink.RuntimeProps;
  isBrowseTemplatesVisible?: Types.Visibility.VisibilityConditions;
  slotSuccessMessage?: Types.Devlink.Slot;
  isRecommendedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
