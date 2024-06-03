import * as React from "react";
import * as Types from "./types";

declare function InterviewConfirmed(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickAddToCalender?: Types.Devlink.RuntimeProps;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textTitle?: React.ReactNode;
  textTime?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  textSentMail?: React.ReactNode;
  onClickContactSupport?: Types.Devlink.RuntimeProps;
  slotBanner?: Types.Devlink.Slot;
}): React.JSX.Element;
