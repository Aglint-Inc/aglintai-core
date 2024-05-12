import * as React from "react";
import * as Types from "./types";

declare function TaskSwitchButton(props: {
  as?: React.ElementType;
  onClickJobCand?: Types.Devlink.RuntimeProps;
  onClickList?: Types.Devlink.RuntimeProps;
  isListActive?: Types.Visibility.VisibilityConditions;
  isJobCandActive?: Types.Visibility.VisibilityConditions;
  textFirst?: React.ReactNode;
  textSecond?: React.ReactNode;
  isIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
