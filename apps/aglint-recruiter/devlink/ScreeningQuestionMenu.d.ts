import * as React from "react";
import * as Types from "./types";

declare function ScreeningQuestionMenu(props: {
  as?: React.ElementType;
  onClickSkill?: Types.Devlink.RuntimeProps;
  isSkillOn?: Types.Visibility.VisibilityConditions;
  isSkillMenuActive?: Types.Visibility.VisibilityConditions;
  textSkills?: React.ReactNode;
  textNoofQuestions?: React.ReactNode;
}): React.JSX.Element;
