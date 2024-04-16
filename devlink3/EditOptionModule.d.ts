import * as React from "react";
import * as Types from "./types";

declare function EditOptionModule(props: {
  as?: React.ElementType;
  onClickViewInSchedule?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancelSchedule?: Types.Devlink.RuntimeProps;
  isViewScheduleVisible?: Types.Visibility.VisibilityConditions;
  isEditVisible?: Types.Visibility.VisibilityConditions;
  isRescheduleVisible?: Types.Visibility.VisibilityConditions;
  isCancelScheduleVisible?: Types.Visibility.VisibilityConditions;
  onClickResendInvite?: Types.Devlink.RuntimeProps;
  isResendInviteVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
