import * as React from "react";
import * as Types from "./types";

declare function NewJobStep3(props: {
  as?: React.ElementType;
  onClickAiPoweredScreening?: Types.Devlink.RuntimeProps;
  onClickStandardScreening?: Types.Devlink.RuntimeProps;
  isAiPoweredScreeningChecked?: Types.Visibility.VisibilityConditions;
  isStandardScreeningChecked?: Types.Visibility.VisibilityConditions;
  slotSkillsQuestion?: Types.Devlink.Slot;
  howItWorksLink?: Types.Basic.Link;
  isHowItWorksVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
