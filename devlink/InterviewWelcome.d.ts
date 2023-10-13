import * as React from "react";
import * as Types from "./types";

declare function InterviewWelcome(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textCompany?: React.ReactNode;
  onClickStartInterview?: Types.Devlink.RuntimeProps;
  onClickAboutCompany?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
