import * as React from "react";
import * as Types from "./types";

declare function SkillsQuestionInput(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  onClickSave?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  isSaveIconsVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
