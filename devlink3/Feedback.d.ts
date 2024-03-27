import * as React from "react";
import * as Types from "./types";

declare function Feedback(props: {
  as?: React.ElementType;
  textRecommendLevel?: React.ReactNode;
  textFeedback?: React.ReactNode;
  onClickEditFeedback?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
