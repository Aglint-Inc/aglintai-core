import * as React from "react";
import * as Types from "./types";

declare function NewJobStep2(props: {
  as?: React.ElementType;
  slotJobDescription?: Types.Devlink.Slot;
  onClickAddSkill?: Types.Devlink.RuntimeProps;
  slotAddedSkill?: Types.Devlink.Slot;
  slotSuggestedSkill?: Types.Devlink.Slot;
  isAddSkillVisible?: Types.Visibility.VisibilityConditions;
  slotRequiredSKill?: Types.Devlink.Slot;
  isJobHeaderVisible?: Types.Visibility.VisibilityConditions;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  isGenerateVisible?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
  isAddJob?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
