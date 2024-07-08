import * as React from "react";
import * as Types from "./types";

declare function AddRolesPop(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  slotRolesPills?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  slotClose?: Types.Devlink.Slot;
}): React.JSX.Element;
