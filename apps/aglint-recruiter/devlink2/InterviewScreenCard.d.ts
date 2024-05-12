import * as React from "react";
import * as Types from "./types";

declare function InterviewScreenCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textTime?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textMeetingPlatform?: React.ReactNode;
  slotMemberImage?: Types.Devlink.Slot;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textMonth?: React.ReactNode;
  textStatus?: React.ReactNode;
  colorPropsText?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
  isStatusVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
