import * as React from "react";
import * as Types from "./types";

declare function AddScheduleCard(props: {
  as?: React.ElementType;
  onClickAddSession?: Types.Devlink.RuntimeProps;
  onClickAddDebriefSession?: Types.Devlink.RuntimeProps;
  onClickAddBreak?: Types.Devlink.RuntimeProps;
  isAddSessionOptionVisible?: Types.Visibility.VisibilityConditions;
  isBreakVisibe?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
