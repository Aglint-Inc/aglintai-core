import * as React from "react";
import * as Types from "./types";

declare function MoreButton(props: {
  as?: React.ElementType;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickArchive?: Types.Devlink.RuntimeProps;
  isArchiveVisible?: Types.Visibility.VisibilityConditions;
  onClickUnarchive?: Types.Devlink.RuntimeProps;
  isUnarchiveVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
