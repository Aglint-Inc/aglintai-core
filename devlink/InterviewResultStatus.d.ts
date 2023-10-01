import * as React from "react";
import * as Types from "./types";

declare function InterviewResultStatus(props: {
  as?: React.ElementType;
  bgColorInterviewTag?: Types.Devlink.RuntimeProps;
  textStatus?: React.ReactNode;
  colorPropsTextStatus?: Types.Devlink.RuntimeProps;
  textDescription?: React.ReactNode;
  slotResendButton?: Types.Devlink.Slot;
  onClickCopyInterviewLink?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
