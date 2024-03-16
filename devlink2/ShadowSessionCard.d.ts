import * as React from "react";
import * as Types from "./types";

declare function ShadowSessionCard(props: {
  as?: React.ElementType;
  slotInterviewScreenCard?: Types.Devlink.Slot;
  isInterviewCardVisible?: Types.Visibility.VisibilityConditions;
  textSessionName?: React.ReactNode;
  propsOpacity?: Types.Devlink.RuntimeProps;
  isLineVisible?: Types.Visibility.VisibilityConditions;
  isShadowIconVisible?: Types.Visibility.VisibilityConditions;
  isReverseShadowIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
