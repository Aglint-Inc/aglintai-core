import * as React from "react";
import * as Types from "./types";

declare function TermsCondition(props: {
  as?: React.ElementType;
  onClickCheckbox?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
