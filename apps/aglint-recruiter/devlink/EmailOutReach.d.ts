import * as React from "react";
import * as Types from "./types";

declare function EmailOutReach(props: {
  as?: React.ElementType;
  onClickEmailOutreach?: Types.Devlink.RuntimeProps;
  isEmailOutreachVisible?: Types.Visibility.VisibilityConditions;
  isFetchingVisible?: Types.Visibility.VisibilityConditions;
  isUnableFetch?: Types.Visibility.VisibilityConditions;
  slotLoaderIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
