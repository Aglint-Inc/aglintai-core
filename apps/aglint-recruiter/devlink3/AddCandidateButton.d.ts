import * as React from "react";
import * as Types from "./types";

declare function AddCandidateButton(props: {
  as?: React.ElementType;
  onClickImport?: Types.Devlink.RuntimeProps;
  isImport?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
