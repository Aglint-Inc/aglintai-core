import * as React from "react";
import * as Types from "./types";

declare function SortButton(props: {
  as?: React.ElementType;
  onClickSortby?: Types.Devlink.RuntimeProps;
  isNotificationVisible?: Types.Visibility.VisibilityConditions;
  textSortCount?: React.ReactNode;
  isSortBadgeVisible?: Types.Visibility.VisibilityConditions;
  textSort?: React.ReactNode;
}): React.JSX.Element;
