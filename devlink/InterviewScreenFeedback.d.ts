import * as React from "react";
import * as Types from "./types";

declare function InterviewScreenFeedback(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickShare?: Types.Devlink.RuntimeProps;
  slotFeedbackCard?: Types.Devlink.Slot;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textMail?: React.ReactNode;
  onClickViewCandidateInfo?: Types.Devlink.RuntimeProps;
  slotScore?: Types.Devlink.Slot;
  textScoreHeader?: React.ReactNode;
  textScoreDescription?: React.ReactNode;
  textDate?: React.ReactNode;
  textDuration?: React.ReactNode;
  textTime?: React.ReactNode;
  textNumberQuestion?: React.ReactNode;
  onClickShowTranscript?: Types.Devlink.RuntimeProps;
  slotDetailedFeedback?: Types.Devlink.Slot;
}): React.JSX.Element;
