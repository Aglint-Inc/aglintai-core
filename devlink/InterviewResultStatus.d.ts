import * as React from "react";
import * as Types from "./types";

declare function InterviewResultStatus(props: {
  as?: React.ElementType;
  slotAssessmentScore?: Types.Devlink.Slot;
  slotAssessmentInvite?: Types.Devlink.Slot;
  onClickIcons?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
