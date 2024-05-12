import * as React from "react";
import * as Types from "./types";

declare function CreateTask(props: {
  as?: React.ElementType;
  slotViewTaskCard?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickPrimaryButton?: Types.Devlink.RuntimeProps;
  slotButtonIcon?: Types.Devlink.Slot;
  textPrimaryButton?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  textTaskDetail?: React.ReactNode;
}): React.JSX.Element;
