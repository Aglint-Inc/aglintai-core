import * as React from "react";
import * as Types from "./types";

declare function CandidateLanding(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textTitle?: React.ReactNode;
  slotCandidateAssesmentCard?: Types.Devlink.Slot;
  textCompanyName?: React.ReactNode;
  textAboutCompany?: React.ReactNode;
  onClickAbout?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
