import * as React from "react";
import * as Types from "./types";

declare function ProfileShare(props: {
  as?: React.ElementType;
  onClickCopyProfile?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textMail?: React.ReactNode;
  textPhone?: React.ReactNode;
  slotResumeScore?: Types.Devlink.Slot;
  textInterviewScore?: React.ReactNode;
  propsTextColor?: Types.Devlink.RuntimeProps;
  textOverview?: React.ReactNode;
  slotInterview?: Types.Devlink.Slot;
}): React.JSX.Element;
