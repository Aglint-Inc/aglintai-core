import * as React from "react";
import * as Types from "./types";

declare function ScreeningQuestions(props: {
  as?: React.ElementType;
  onClickCulturalFit?: Types.Devlink.RuntimeProps;
  onClickPersonalityFit?: Types.Devlink.RuntimeProps;
  onClickSkillBased?: Types.Devlink.RuntimeProps;
  onClickSoftSkill?: Types.Devlink.RuntimeProps;
  onClickAddCustomQuestion?: Types.Devlink.RuntimeProps;
  isSoftSkillMenuActive?: Types.Visibility.VisibilityConditions;
  isSoftSkillOn?: Types.Visibility.VisibilityConditions;
  slotSkillMenu?: Types.Devlink.Slot;
  slotScreeningRight?: Types.Devlink.Slot;
  textCountActiveQuestion?: React.ReactNode;
}): React.JSX.Element;
