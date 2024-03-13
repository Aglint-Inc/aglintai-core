import * as React from "react";
import * as Types from "./types";

declare function AvatarWithName(props: {
  as?: React.ElementType;
  isReverseShadowVisible?: Types.Visibility.VisibilityConditions;
  isShadowVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
