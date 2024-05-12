import * as React from "react";
import * as Types from "./types";

declare function ActivityFlowCard(props: {
  as?: React.ElementType;
  textActivity?: React.ReactNode;
  textDateTime?: React.ReactNode;
  isActivityActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
