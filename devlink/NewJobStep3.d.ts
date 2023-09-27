import * as React from "react";
import * as Types from "./types";

declare function NewJobStep3(props: {
  as?: React.ElementType;
  slotJobDescription?: Types.Devlink.Slot;
  onClickAddSkill?: Types.Devlink.RuntimeProps;
  slotAddedSkill?: Types.Devlink.Slot;
  slotSuggestedSkill?: Types.Devlink.Slot;
  isAddSkillVisible?: Types.Visibility.VisibilityConditions;
  slotRequiredSKill?: Types.Devlink.Slot;
}): React.JSX.Element;
