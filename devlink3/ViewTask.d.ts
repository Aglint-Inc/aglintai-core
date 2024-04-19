import * as React from "react";
import * as Types from "./types";

declare function ViewTask(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotTaskCard?: Types.Devlink.Slot;
  slotTaskProgress?: Types.Devlink.Slot;
  textTaskDetail?: React.ReactNode;
}): React.JSX.Element;
