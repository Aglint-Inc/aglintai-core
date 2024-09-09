import * as React from "react";
import * as Types from "./types";

declare function AssessmentEmpty(props: {
  as?: React.ElementType;
  onClickCreate?: Types.Devlink.RuntimeProps;
  isCreateNew?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;