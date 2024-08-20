import * as React from "react";
import * as Types from "./types";

declare function AddScheduleOption(props: {
  as?: React.ElementType;
  onClickAddSession?: Types.Devlink.RuntimeProps;
  onClickAddDebriefSession?: Types.Devlink.RuntimeProps;
  onClickAddBreak?: Types.Devlink.RuntimeProps;
  isBreakVisibe?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
