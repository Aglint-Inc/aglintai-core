import * as React from "react";
import * as Types from "./types";

declare function InterviewCompleted(props: {
  as?: React.ElementType;
  slotLottie?: Types.Devlink.Slot;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickSupport?: Types.Devlink.RuntimeProps;
  textTitle?: React.ReactNode;
  textDescription?: React.ReactNode;
}): React.JSX.Element;
