import * as React from "react";
import * as Types from "./types";

declare function ScreeningQuestion(props: {
  as?: React.ElementType;
  onClickUploadVideo?: Types.Devlink.RuntimeProps;
  slotToggleAssessment?: Types.Devlink.Slot;
  slotWelcomeMessage?: Types.Devlink.Slot;
  slotIntroductionVideo?: Types.Devlink.Slot;
  slotEndingMessageVideo?: Types.Devlink.Slot;
  slotAssessmentQuestion?: Types.Devlink.Slot;
  textQuestionCount?: React.ReactNode;
}): React.JSX.Element;
