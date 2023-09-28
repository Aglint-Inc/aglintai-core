import * as React from "react";
import * as Types from "./types";

declare function JobScreening(props: {
  as?: React.ElementType;
  textRole?: React.ReactNode;
  slotStopSubmission?: Types.Devlink.Slot;
  onClickAllApplicant?: Types.Devlink.RuntimeProps;
  onClickInterviewing?: Types.Devlink.RuntimeProps;
  countInterviewing?: React.ReactNode;
  onClickRejected?: Types.Devlink.RuntimeProps;
  countRejected?: React.ReactNode;
  onClickSelected?: Types.Devlink.RuntimeProps;
  countSelected?: React.ReactNode;
  slotSearch?: Types.Devlink.Slot;
  slotCandidateJobCard?: Types.Devlink.Slot;
  textApplicantsNumber?: React.ReactNode;
  textJobStatus?: React.ReactNode;
  slotAddCandidates?: Types.Devlink.Slot;
  countAll?: React.ReactNode;
}): React.JSX.Element;
