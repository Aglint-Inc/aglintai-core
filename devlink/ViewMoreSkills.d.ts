import * as React from "react";
import * as Types from "./types";

declare function ViewMoreSkills(props: {
  as?: React.ElementType;
  isViewLessVisible?: Types.Visibility.VisibilityConditions;
  isViewMoreVisible?: Types.Visibility.VisibilityConditions;
  onClickViewMore?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
