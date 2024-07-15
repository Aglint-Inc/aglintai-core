import * as React from "react";
import * as Types from "./types";

declare function MemberListCardOption(props: {
  as?: React.ElementType;
  onClickMoveToQualifier?: Types.Devlink.RuntimeProps;
  isMoveToQualifierVisible?: Types.Visibility.VisibilityConditions;
  onClickPauseInterview?: Types.Devlink.RuntimeProps;
  isPauseVisible?: Types.Visibility.VisibilityConditions;
  onClickResumeInterview?: Types.Devlink.RuntimeProps;
  isResumeVisible?: Types.Visibility.VisibilityConditions;
  onClickRemoveModule?: Types.Devlink.RuntimeProps;
  isRemoveVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
