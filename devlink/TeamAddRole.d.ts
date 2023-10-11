import * as React from "react";
import * as Types from "./types";

declare function TeamAddRole(props: {
  as?: React.ElementType;
  slotNameInput?: Types.Devlink.Slot;
  slotPermissions?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
