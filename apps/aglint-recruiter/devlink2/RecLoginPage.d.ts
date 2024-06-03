import * as React from "react";
import * as Types from "./types";

declare function RecLoginPage(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  onclickLogin?: Types.Devlink.RuntimeProps;
  contactLink?: Types.Basic.Link;
  onclickGoogle?: Types.Devlink.RuntimeProps;
  onclickLinkedIn?: Types.Devlink.RuntimeProps;
  onclickSignup?: Types.Devlink.RuntimeProps;
  onclickForgotPassword?: Types.Devlink.RuntimeProps;
  slotLottie?: Types.Devlink.Slot;
  textLogin?: React.ReactNode;
  isLoginButtonDisable?: Types.Visibility.VisibilityConditions;
  isLottieVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
