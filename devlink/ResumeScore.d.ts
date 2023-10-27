import * as React from "react";
import * as Types from "./types";

declare function ResumeScore(props: {
  as?: React.ElementType;
  textResumeScoreState?: React.ReactNode;
  propsTextColorResumeScore?: Types.Devlink.RuntimeProps;
  slotResumeScore?: Types.Devlink.Slot;
  onClickDownloadResume?: Types.Devlink.RuntimeProps;
  onClickViewResume?: Types.Devlink.RuntimeProps;
  textSummaryScore?: React.ReactNode;
  textExperienceScore?: React.ReactNode;
  textEducationScore?: React.ReactNode;
  textProjectScore?: React.ReactNode;
  textCertificateScore?: React.ReactNode;
  textSkillScore?: React.ReactNode;
}): React.JSX.Element;
