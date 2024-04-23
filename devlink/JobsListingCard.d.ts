import * as React from "react";
import * as Types from "./types";

declare function JobsListingCard(props: {
  as?: React.ElementType;
  textJobRole?: React.ReactNode;
  textCompanyLocation?: React.ReactNode;
  textPostedDate?: React.ReactNode;
  assessmentCount?: React.ReactNode;
  qualifiedCount?: React.ReactNode;
  bgColorProps?: Types.Devlink.RuntimeProps;
  textJobsStatus?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
  slotStatusIcon?: Types.Devlink.Slot;
  newCount?: React.ReactNode;
  slotAtsBadge?: Types.Devlink.Slot;
  isStatusVisible?: Types.Visibility.VisibilityConditions;
  textStatus?: React.ReactNode;
  isJobWarningVisible?: Types.Visibility.VisibilityConditions;
  screeningCount?: React.ReactNode;
  disqualifiedCount?: React.ReactNode;
  isScreeningPillsVisible?: Types.Visibility.VisibilityConditions;
  isAssessmentPillVisible?: Types.Visibility.VisibilityConditions;
  interviewCount?: React.ReactNode;
}): React.JSX.Element;
