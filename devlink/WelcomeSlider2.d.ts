import * as React from "react";
import * as Types from "./types";

declare function WelcomeSlider2(props: {
  as?: React.ElementType;
  onClickLogInGoogle?: Types.Devlink.RuntimeProps;
  onClickLogInLinkedIn?: Types.Devlink.RuntimeProps;
  slotSignInForm?: Types.Devlink.Slot;
  onClickSignUp?: Types.Devlink.RuntimeProps;
  onClickCheck?: Types.Devlink.RuntimeProps;
  onClickLogin?: Types.Devlink.RuntimeProps;
  isLoginButtonDisable?: Types.Visibility.VisibilityConditions;
  isChecked?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
