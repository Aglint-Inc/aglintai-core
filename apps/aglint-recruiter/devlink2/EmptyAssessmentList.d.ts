import * as React from "react";
import * as Types from "./types";

declare function EmptyAssessmentList(props: {
  as?: React.ElementType;
  onClickBrowseAssessment?: Types.Devlink.RuntimeProps;
  message?: React.ReactNode;
  linkText?: React.ReactNode;
}): React.JSX.Element;
