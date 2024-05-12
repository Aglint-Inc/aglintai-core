import * as React from "react";
import * as Types from "./types";

declare function TrainingProgress(props: {
  as?: React.ElementType;
  onClickViewAllInterviewers?: Types.Devlink.RuntimeProps;
  slotTrainingProgressList?: Types.Devlink.Slot;
  isViewAllVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
