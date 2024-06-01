import * as React from "react";
import * as Types from "./types";

declare function DatePickerBody(props: {
  as?: React.ElementType;
  slotMuiDatePicker?: Types.Devlink.Slot;
  textDescription?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
  isEmailAgent?: Types.Visibility.VisibilityConditions;
  isPhoneAgent?: Types.Visibility.VisibilityConditions;
  isRequestAvailability?: Types.Visibility.VisibilityConditions;
  isSelfScheduling?: Types.Visibility.VisibilityConditions;
  isContinueButton?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
