import * as React from "react";
import * as Types from "./types";

declare function PhoneScreeningQ(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  currentQuestionNo?: React.ReactNode;
  totalQuestionNo?: React.ReactNode;
  textQuestion?: React.ReactNode;
  slotInputAndButton?: Types.Devlink.Slot;
  textDescription?: React.ReactNode;
  isDescriptionVisible?: Types.Visibility.VisibilityConditions;
  isSubmitButtonVisible?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
