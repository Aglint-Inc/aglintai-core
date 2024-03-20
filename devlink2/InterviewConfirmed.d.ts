import * as React from "react";
import * as Types from "./types";

declare function InterviewConfirmed(props: {
  as?: React.ElementType;
  slotPlatformIcon?: Types.Devlink.Slot;
  textMeetingPlatform?: React.ReactNode;
  slotSessionList?: Types.Devlink.Slot;
  slotCardDate?: Types.Devlink.Slot;
  textMailSent?: React.ReactNode;
  onClickSupport?: Types.Devlink.RuntimeProps;
  textTitle?: React.ReactNode;
  slotCompanyLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
