import * as React from "react";
import * as Types from "./types";

declare function InterviewWelcome(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textCompany?: React.ReactNode;
  onClickStart?: Types.Devlink.RuntimeProps;
  onClickAboutCompany?: Types.Devlink.RuntimeProps;
  onClickSupport?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
