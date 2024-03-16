import * as React from "react";
import * as Types from "./types";

declare function MutedShadowSession(props: {
  as?: React.ElementType;
  textSessionHeader?: React.ReactNode;
  isShadowIconVisible?: Types.Visibility.VisibilityConditions;
  isReverseShadowIconVisible?: Types.Visibility.VisibilityConditions;
  isLineVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
