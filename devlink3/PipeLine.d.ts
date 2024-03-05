import * as React from "react";
import * as Types from "./types";

declare function PipeLine(props: {
  as?: React.ElementType;
  isLeft?: Types.Visibility.VisibilityConditions;
  isRight?: Types.Visibility.VisibilityConditions;
  textName?: React.ReactNode;
  textCandidateCount?: React.ReactNode;
  onClickPipeline?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
