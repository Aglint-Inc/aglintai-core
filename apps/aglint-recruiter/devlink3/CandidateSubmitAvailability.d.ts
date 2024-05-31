import * as React from "react";
import * as Types from "./types";

declare function CandidateSubmitAvailability(props: {
  as?: React.ElementType;
  slotList?: Types.Devlink.Slot;
  onClickSchedule?: Types.Devlink.RuntimeProps;
  onClickReReq?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
