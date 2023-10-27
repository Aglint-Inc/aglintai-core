import * as React from "react";
import * as Types from "./types";

declare function CandidatesData(props: {
  as?: React.ElementType;
  onClickNew?: Types.Devlink.RuntimeProps;
  onClickInterviewing?: Types.Devlink.RuntimeProps;
  onClickQualified?: Types.Devlink.RuntimeProps;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  textCountNew?: React.ReactNode;
  textCountInterviewing?: React.ReactNode;
  textCountQualified?: React.ReactNode;
  textCountDisqualified?: React.ReactNode;
  isNewActive?: Types.Visibility.VisibilityConditions;
  isInterviewingActive?: Types.Visibility.VisibilityConditions;
  isQualifiedActive?: Types.Visibility.VisibilityConditions;
  isDisqualifiedActive?: Types.Visibility.VisibilityConditions;
  slotSearch?: Types.Devlink.Slot;
  onClickUpload?: Types.Devlink.RuntimeProps;
  slotTable?: Types.Devlink.Slot;
}): React.JSX.Element;
