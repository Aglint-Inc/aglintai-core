import * as React from "react";
import * as Types from "./types";

declare function InterviewConfirmed(props: {
  as?: React.ElementType;
  textMailSent?: React.ReactNode;
  slotCompanyLogo?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
  slotInterviewConfirmedCard?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  onClickAddCalender?: Types.Devlink.RuntimeProps;
  slotBanner?: Types.Devlink.Slot;
  isBannerVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
