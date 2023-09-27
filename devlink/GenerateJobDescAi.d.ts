import * as React from "react";
import * as Types from "./types";

declare function GenerateJobDescAi(props: {
  as?: React.ElementType;
  isChecked?: Types.Visibility.VisibilityConditions;
  onClickCheck?: Types.Devlink.RuntimeProps;
  onClickGenerate?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
