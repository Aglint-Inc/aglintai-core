import * as React from "react";
import * as Types from "./types";

declare function ScheduleNowButton(props: {
  as?: React.ElementType;
  onClickScheduleManually?: Types.Devlink.RuntimeProps;
  onClickEmailAgent?: Types.Devlink.RuntimeProps;
  onClickPhoneAgent?: Types.Devlink.RuntimeProps;
  isScheduleManuallyVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
