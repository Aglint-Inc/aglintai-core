import * as React from "react";
import * as Types from "./types";

declare function AssisstantSettings(props: {
  as?: React.ElementType;
  slotNameInput?: Types.Devlink.Slot;
  slotInstructionsInput?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
  slotCode?: Types.Devlink.Slot;
  onclickCopy?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
