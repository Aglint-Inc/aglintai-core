import * as React from "react";
import * as Types from "./types";

declare function ShortAnswerQuestion(props: {
  as?: React.ElementType;
  slotQuestionInput?: Types.Devlink.Slot;
  slotAnswerInput?: Types.Devlink.Slot;
  slotToggle?: Types.Devlink.Slot;
  slotDescriptionTextArea?: Types.Devlink.Slot;
  slotDurationInput?: Types.Devlink.Slot;
  slotRcCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
