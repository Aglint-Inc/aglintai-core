import * as React from "react";
import * as Types from "./types";

declare function AllInterviewCard(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textStatus?: React.ReactNode;
  colorPropsText?: Types.Devlink.RuntimeProps;
  colorPropsBg?: Types.Devlink.RuntimeProps;
  textMeeting?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textTimeDate?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotPanelImage?: Types.Devlink.Slot;
  textInterviewPanel?: React.ReactNode;
  textRelatedJob?: React.ReactNode;
}): React.JSX.Element;
