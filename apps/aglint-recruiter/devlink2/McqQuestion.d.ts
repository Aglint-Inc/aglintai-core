import * as React from "react";
import * as Types from "./types";

declare function McqQuestion(props: {
  as?: React.ElementType;
  onClcikAddOption?: Types.Devlink.RuntimeProps;
  slotQuestionInput?: Types.Devlink.Slot;
  slotOptions?: Types.Devlink.Slot;
  slotTextarea?: Types.Devlink.Slot;
  slotDurationInput?: Types.Devlink.Slot;
  slotToggle?: Types.Devlink.Slot;
  slotRcCheckbox?: Types.Devlink.Slot;
  isHint?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
