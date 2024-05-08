import * as React from "react";
import * as Types from "./types";

declare function NewTabPill(props: {
  as?: React.ElementType;
  isPillActive?: Types.Visibility.VisibilityConditions;
  onClickPill?: Types.Devlink.RuntimeProps;
  textLabel?: React.ReactNode;
}): React.JSX.Element;
