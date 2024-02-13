import * as React from "react";
import * as Types from "./types";

declare function McqQuestion(props: {
  as?: React.ElementType;
  onClcikAddOption?: Types.Devlink.RuntimeProps;
  slotQuestionInput?: Types.Devlink.Slot;
  slotOptions?: Types.Devlink.Slot;
  slotToggleAndTextarea?: Types.Devlink.Slot;
  slotDurationInput?: Types.Devlink.Slot;
}): React.JSX.Element;
