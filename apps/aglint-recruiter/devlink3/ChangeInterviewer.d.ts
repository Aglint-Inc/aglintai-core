import * as React from "react";
import * as Types from "./types";

declare function ChangeInterviewer(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  textAvailableDesc?: React.ReactNode;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textDesignation?: React.ReactNode;
  slotInterviewerList?: Types.Devlink.Slot;
  onClickChange?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
