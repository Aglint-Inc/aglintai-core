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
  textCompanyDescription?: React.ReactNode;
  isAboutVisible?: Types.Visibility.VisibilityConditions;
  slotWelcomeVideo?: Types.Devlink.Slot;
  isPlayPuaseVisible?: Types.Visibility.VisibilityConditions;
  isPauseButtonVisible?: Types.Visibility.VisibilityConditions;
  isPlayButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickPlay?: Types.Devlink.RuntimeProps;
  onClickPause?: Types.Devlink.RuntimeProps;
  isWelcomeVideoVisible?: Types.Visibility.VisibilityConditions;
  slotAssessmentInstruction?: Types.Devlink.Slot;
  isPreviewWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
