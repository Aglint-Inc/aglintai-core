import * as React from "react";
import * as Types from "./types";

declare function TeamOptionList(props: {
  as?: React.ElementType;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickCancelInvite?: Types.Devlink.RuntimeProps;
  onClickSuspend?: Types.Devlink.RuntimeProps;
  onClickMarkActive?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  isEditVisible?: Types.Visibility.VisibilityConditions;
  isCancelInviteVisible?: Types.Visibility.VisibilityConditions;
  isSuspendVisible?: Types.Visibility.VisibilityConditions;
  isMarkActiveVisible?: Types.Visibility.VisibilityConditions;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
