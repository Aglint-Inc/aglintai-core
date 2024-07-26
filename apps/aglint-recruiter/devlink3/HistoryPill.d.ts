import * as React from "react";
import * as Types from "./types";

declare function HistoryPill(props: {
  as?: React.ElementType;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  isShadow?: Types.Visibility.VisibilityConditions;
  isActive?: Types.Visibility.VisibilityConditions;
  position?: Types.Builtin.Text;
  slotHistoryTrainingCard?: Types.Devlink.Slot;
  isHistoryTrainingCardVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
