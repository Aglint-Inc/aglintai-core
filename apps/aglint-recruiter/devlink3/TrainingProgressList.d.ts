import * as React from "react";
import * as Types from "./types";

declare function TrainingProgressList(props: {
  as?: React.ElementType;
  slotInterviewerImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textInterviewModule?: React.ReactNode;
  slotHistoryPill?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
