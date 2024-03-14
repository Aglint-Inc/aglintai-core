import * as React from "react";
import * as Types from "./types";

declare function EditJobTopBarRight(props: {
  as?: React.ElementType;
  onClickDraft?: Types.Devlink.RuntimeProps;
  onClickPublish?: Types.Devlink.RuntimeProps;
  isDraft?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
