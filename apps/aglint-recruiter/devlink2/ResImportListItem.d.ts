import * as React from "react";
import * as Types from "./types";

declare function ResImportListItem(props: {
  as?: React.ElementType;
  isPdf?: Types.Visibility.VisibilityConditions;
  isDoc?: Types.Visibility.VisibilityConditions;
  isUnsupported?: Types.Visibility.VisibilityConditions;
  fileName?: React.ReactNode;
  fileSize?: React.ReactNode;
  onclickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
