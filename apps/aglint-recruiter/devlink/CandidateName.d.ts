import * as React from "react";
import * as Types from "./types";

declare function CandidateName(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  onClickLinkedin?: Types.Devlink.RuntimeProps;
  onClickResume?: Types.Devlink.RuntimeProps;
  isLinedin?: Types.Visibility.VisibilityConditions;
  isResume?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
