import * as React from "react";
import * as Types from "./types";

declare function LeaderBoard(props: {
  as?: React.ElementType;
  onClickThisWeek?: Types.Devlink.RuntimeProps;
  isWeekActive?: Types.Visibility.VisibilityConditions;
  onClickThisMonth?: Types.Devlink.RuntimeProps;
  isMonthActive?: Types.Visibility.VisibilityConditions;
  onClickThisYear?: Types.Devlink.RuntimeProps;
  isYearActive?: Types.Visibility.VisibilityConditions;
  slotLeaderboardCard?: Types.Devlink.Slot;
}): React.JSX.Element;
