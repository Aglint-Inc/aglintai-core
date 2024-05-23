import * as React from "react";
import * as Types from "./types";

declare function AgentFollowUp(props: {
  as?: React.ElementType;
  isPhoneAgentIcon?: Types.Visibility.VisibilityConditions;
  isEmailAgentIcon?: Types.Visibility.VisibilityConditions;
  textFollowup?: React.ReactNode;
  isNoBorder?: Types.Visibility.VisibilityConditions;
  isMakeAPhoneCall?: Types.Visibility.VisibilityConditions;
  isSendFollowupEmail?: Types.Visibility.VisibilityConditions;
  isConactViaEmail?: Types.Visibility.VisibilityConditions;
  isCallAgain?: Types.Visibility.VisibilityConditions;
  onClickMakeAPhoneCall?: Types.Devlink.RuntimeProps;
  onClickSendFollowupEmail?: Types.Devlink.RuntimeProps;
  onClickContactViaEmail?: Types.Devlink.RuntimeProps;
  onClickCallAgain?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
