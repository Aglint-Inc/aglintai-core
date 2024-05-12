import * as React from "react";
import * as Types from "./types";

declare function TrainingProgressDetail(props: {
  as?: React.ElementType;
  slotTrainingDetailList?: Types.Devlink.Slot;
  onClickAddShadow?: Types.Devlink.RuntimeProps;
  onClickAddReverseShadow?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
