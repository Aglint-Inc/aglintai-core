import * as React from "react";
import * as Types from "./types";

declare function JobDetailsFilterBlock(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  onclickTopApplicants?: Types.Devlink.RuntimeProps;
  onclickAllApplicants?: Types.Devlink.RuntimeProps;
  isTopApplicants?: Types.Visibility.VisibilityConditions;
  isAllApplicants?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
