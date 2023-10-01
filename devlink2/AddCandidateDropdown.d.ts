import * as React from "react";
import * as Types from "./types";

declare function AddCandidateDropdown(props: {
  as?: React.ElementType;
  onClickManual?: Types.Devlink.RuntimeProps;
  onClickImport?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
