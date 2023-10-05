import * as React from "react";
import * as Types from "./types";

declare function InterviewScreenFeedback(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickCopyProfile?: Types.Devlink.RuntimeProps;
  slotFeedbackCard?: Types.Devlink.Slot;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textMail?: React.ReactNode;
  textDate?: React.ReactNode;
  textDuration?: React.ReactNode;
  textTime?: React.ReactNode;
  textNumberQuestion?: React.ReactNode;
  slotDetailedFeedback?: Types.Devlink.Slot;
  textPhone?: React.ReactNode;
  slotInterviewResult?: Types.Devlink.Slot;
  slotResumeResult?: Types.Devlink.Slot;
  isInterviewResultVisible?: Types.Visibility.VisibilityConditions;
  isResumeResultVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
