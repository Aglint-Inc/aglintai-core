import * as React from "react";
import * as Types from "./types";

declare function UploadedResumeList(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textSize?: React.ReactNode;
  isPdfIconVisible?: Types.Visibility.VisibilityConditions;
  isDocVisible?: Types.Visibility.VisibilityConditions;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
