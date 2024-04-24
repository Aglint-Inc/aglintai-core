import * as React from "react";
import * as Types from "./types";

declare function GraphButtonOption(props: {
  as?: React.ElementType;
  onClickWeek?: Types.Devlink.RuntimeProps;
  isWeekVisible?: Types.Visibility.VisibilityConditions;
  onClickMonth?: Types.Devlink.RuntimeProps;
  isMonthVisible?: Types.Visibility.VisibilityConditions;
  onClickYear?: Types.Devlink.RuntimeProps;
  isYearVisible?: Types.Visibility.VisibilityConditions;
  onClickAllTime?: Types.Devlink.RuntimeProps;
  isAllTimeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
