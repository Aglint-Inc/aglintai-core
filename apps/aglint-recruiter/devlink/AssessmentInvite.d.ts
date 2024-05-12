import * as React from "react";
import * as Types from "./types";

declare function AssessmentInvite(props: {
  as?: React.ElementType;
  textDescription?: React.ReactNode;
  slotResendButton?: Types.Devlink.Slot;
  onClickCopyInterviewLink?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
