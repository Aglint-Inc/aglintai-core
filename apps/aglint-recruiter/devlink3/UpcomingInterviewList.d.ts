import * as React from "react";
import * as Types from "./types";

declare function UpcomingInterviewList(props: {
  as?: React.ElementType;
  slotPanelIcon?: Types.Devlink.Slot;
  textPanelName?: React.ReactNode;
  textDate?: React.ReactNode;
  textTime?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
