import * as React from "react";
import * as Types from "./types";

declare function ResumeResult(props: {
  as?: React.ElementType;
  slotResumeScore?: Types.Devlink.Slot;
  textFeedback?: React.ReactNode;
  onClickDownloadResume?: Types.Devlink.RuntimeProps;
  onClickViewResume?: Types.Devlink.RuntimeProps;
  textSummaryScore?: React.ReactNode;
  textExperienceScore?: React.ReactNode;
  textEducationScore?: React.ReactNode;
  textProjectScore?: React.ReactNode;
  textCertificationScore?: React.ReactNode;
  textSkillsScore?: React.ReactNode;
}): React.JSX.Element;
