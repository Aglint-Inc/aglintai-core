import * as React from "react";
import * as Types from "./types";

declare function AllInterviewCard(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textStatus?: React.ReactNode;
  colorPropsText?: Types.Devlink.RuntimeProps;
  colorPropsBg?: Types.Devlink.RuntimeProps;
  textDuration?: React.ReactNode;
  slotPanelImage?: Types.Devlink.Slot;
  textInterviewPanel?: React.ReactNode;
  textRelatedJob?: React.ReactNode;
  slotScheduleInfo?: Types.Devlink.Slot;
}): React.JSX.Element;
