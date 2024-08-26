import * as React from "react";
import * as Types from "./types";

declare function CompletedInterviews(props: {
  as?: React.ElementType;
  slotGraph?: Types.Devlink.Slot;
  textMonth?: React.ReactNode;
  textLastDays?: React.ReactNode;
  onClickLastMonth?: Types.Devlink.RuntimeProps;
  onClickLastDays?: Types.Devlink.RuntimeProps;
  isLastMonthsActive?: Types.Visibility.VisibilityConditions;
  isLastDaysActive?: Types.Visibility.VisibilityConditions;
  textLastQuarter?: React.ReactNode;
  onClickLastQuarter?: Types.Devlink.RuntimeProps;
  isLastQuarterActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
