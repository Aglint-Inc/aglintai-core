import * as React from "react";
import * as Types from "./types";

declare function RecentRescheduleList(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textTime?: React.ReactNode;
  textDesc?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  onClickView?: Types.Devlink.RuntimeProps;
  onClickCandidate?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
