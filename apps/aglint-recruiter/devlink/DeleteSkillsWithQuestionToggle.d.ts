import * as React from "react";
import * as Types from "./types";

declare function DeleteSkillsWithQuestionToggle(props: {
  as?: React.ElementType;
  textSkills?: React.ReactNode;
  slotLottie?: Types.Devlink.Slot;
  slotQuestions?: Types.Devlink.Slot;
  onClickAddAnotherQuestion?: Types.Devlink.RuntimeProps;
  onClickToggle?: Types.Devlink.RuntimeProps;
  isButtonDisable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
