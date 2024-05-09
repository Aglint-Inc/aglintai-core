import * as React from "react";
import * as Types from "./types";

declare function TrainingDetailList(props: {
  as?: React.ElementType;
  isReverse?: Types.Visibility.VisibilityConditions;
  isShadow?: Types.Visibility.VisibilityConditions;
  textTraining?: React.ReactNode;
  slotTrainingStatus?: Types.Devlink.Slot;
  slotPanelBlock?: Types.Devlink.Slot;
}): React.JSX.Element;
