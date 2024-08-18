import * as React from "react";
import * as Types from "./types";

declare function ApplicationDetail(props: {
  as?: React.ElementType;
  slotApplicantInfoBox?: Types.Devlink.Slot;
  slotTab?: Types.Devlink.Slot;
  slotCandidateInterviewProgress?: Types.Devlink.Slot;
  slotApplicantDetailStage?: Types.Devlink.Slot;
}): React.JSX.Element;
