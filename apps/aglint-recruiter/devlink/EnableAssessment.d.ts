import * as React from "react";
import * as Types from "./types";

declare function EnableAssessment(props: {
  as?: React.ElementType;
  isEnableAssessmentVisible?: Types.Visibility.VisibilityConditions;
  isPhoneScreeningEnable?: Types.Visibility.VisibilityConditions;
  onClickEnablePhoneScreening?: Types.Devlink.RuntimeProps;
  slotAssessmentButton?: Types.Devlink.Slot;
  slotPhoneScreenButton?: Types.Devlink.Slot;
}): React.JSX.Element;
