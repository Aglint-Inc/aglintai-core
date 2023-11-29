import * as React from "react";
import * as Types from "./types";

declare function FilterButton(props: {
  as?: React.ElementType;
  onClickFilter?: Types.Devlink.RuntimeProps;
  isNotificationVisible?: Types.Visibility.VisibilityConditions;
  textFilterCount?: React.ReactNode;
}): React.JSX.Element;
