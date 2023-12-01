import * as React from "react";
import * as Types from "./types";

declare function AddJob(props: {
  as?: React.ElementType;
  slotAddJobList?: Types.Devlink.Slot;
  textJobSelected?: React.ReactNode;
  slotAddButton?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
