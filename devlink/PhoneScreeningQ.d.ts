import * as React from "react";
import * as Types from "./types";

declare function PhoneScreeningQ(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  currentQuestionNo?: React.ReactNode;
  totalQuestionNo?: React.ReactNode;
  textQuestion?: React.ReactNode;
  isQuestionImp?: Types.Visibility.VisibilityConditions;
  slotInputAndButton?: Types.Devlink.Slot;
  onClickBack?: Types.Devlink.RuntimeProps;
  textDescription?: React.ReactNode;
  isDescriptionVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
