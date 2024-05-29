import * as React from "react";
import * as Types from "./types";

declare function ScheduleTypeButton(props: {
  as?: React.ElementType;
  isSelfScheduleIcon?: Types.Visibility.VisibilityConditions;
  isRequestAvailabilityIcon?: Types.Visibility.VisibilityConditions;
  isDebriefIcon?: Types.Visibility.VisibilityConditions;
  isAgentIcon?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
