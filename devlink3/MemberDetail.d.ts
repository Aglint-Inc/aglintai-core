import * as React from "react";
import * as Types from "./types";

declare function MemberDetail(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  isShadow?: Types.Visibility.VisibilityConditions;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  textName?: React.ReactNode;
  isDesignationVisible?: Types.Visibility.VisibilityConditions;
  textDesignation?: React.ReactNode;
  textJobTitle?: React.ReactNode;
  textMail?: React.ReactNode;
  textLocation?: React.ReactNode;
  textTimeZone?: React.ReactNode;
  textTodayInterview?: React.ReactNode;
  textWeekInterview?: React.ReactNode;
  onClickViewInterviewDetail?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
