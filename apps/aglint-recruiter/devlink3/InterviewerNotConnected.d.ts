import * as React from "react";
import * as Types from "./types";

declare function InterviewerNotConnected(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  onClickSendReminder?: Types.Devlink.RuntimeProps;
  textDescription?: React.ReactNode;
}): React.JSX.Element;