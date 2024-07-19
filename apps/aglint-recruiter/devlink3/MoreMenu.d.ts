import * as React from "react";
import * as Types from "./types";

declare function MoreMenu(props: {
  as?: React.ElementType;
  onClickArchive?: Types.Devlink.RuntimeProps;
  isArchiveVisible?: Types.Visibility.VisibilityConditions;
  onClickUnarchive?: Types.Devlink.RuntimeProps;
  isUnarchiveVisible?: Types.Visibility.VisibilityConditions;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
