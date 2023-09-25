import * as React from "react";
import * as Types from "./types";

declare function DraftCoverBtn(props: {
  as?: React.ElementType;
  draftBtnProps?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
