import * as React from "react";
import * as Types from "./types";

declare function SkillsWithQuestionToggle(props: {
  as?: React.ElementType;
  textSkills?: React.ReactNode;
  slotLottie?: Types.Devlink.Slot;
  slotQuestions?: Types.Devlink.Slot;
  onClickAddAnotherQuestion?: Types.Devlink.RuntimeProps;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  onClickToggle?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
