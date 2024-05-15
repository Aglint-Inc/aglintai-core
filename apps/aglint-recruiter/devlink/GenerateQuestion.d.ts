import * as React from "react";
import * as Types from "./types";

declare function GenerateQuestion(props: {
  as?: React.ElementType;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  isGenerateButtonDisable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
