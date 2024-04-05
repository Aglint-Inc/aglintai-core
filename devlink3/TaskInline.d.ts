import * as React from "react";
import * as Types from "./types";

declare function TaskInline(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  textTaskName?: React.ReactNode;
  textDate?: React.ReactNode;
  slotPill?: Types.Devlink.Slot;
  slotTaskStatus?: Types.Devlink.Slot;
  onClickStatus?: Types.Devlink.RuntimeProps;
  onClickOpen?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
