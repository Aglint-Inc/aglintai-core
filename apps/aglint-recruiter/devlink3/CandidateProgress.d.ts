import * as React from "react";
import * as Types from "./types";

declare function CandidateProgress(props: {
  as?: React.ElementType;
  isLeftArrowVisible?: Types.Visibility.VisibilityConditions;
  isRightArrowVisible?: Types.Visibility.VisibilityConditions;
  status?: Types.Builtin.Text;
}): React.JSX.Element;
