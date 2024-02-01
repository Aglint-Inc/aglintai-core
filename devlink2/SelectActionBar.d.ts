import * as React from "react";
import * as Types from "./types";

declare function SelectActionBar(props: {
  as?: React.ElementType;
  onClickClear?: Types.Devlink.RuntimeProps;
  textSelected?: React.ReactNode;
  selectAllText?: React.ReactNode;
  isSelectAllVisible?: Types.Visibility.VisibilityConditions;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  slotDropdown?: Types.Devlink.Slot;
  isSendScreeningVisible?: Types.Visibility.VisibilityConditions;
  onclickSendScreening?: Types.Devlink.RuntimeProps;
  isAssessmentVisible?: Types.Visibility.VisibilityConditions;
  onclickAssessment?: Types.Devlink.RuntimeProps;
  isDisqualifyVisible?: Types.Visibility.VisibilityConditions;
  onclickDisqualify?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
