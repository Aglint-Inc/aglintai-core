import * as React from "react";
import * as Types from "./types";

declare function HistoryPill(props: {
  as?: React.ElementType;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  isShadow?: Types.Visibility.VisibilityConditions;
  isActive?: Types.Visibility.VisibilityConditions;
  isStartActive?: Types.Visibility.VisibilityConditions;
  isMiddleActive?: Types.Visibility.VisibilityConditions;
  isEndActive?: Types.Visibility.VisibilityConditions;
  isStart?: Types.Visibility.VisibilityConditions;
  isMiddle?: Types.Visibility.VisibilityConditions;
  isEnd?: Types.Visibility.VisibilityConditions;
  slotHistoryTrainingCard?: Types.Devlink.Slot;
  isHistoryTrainingCardVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
