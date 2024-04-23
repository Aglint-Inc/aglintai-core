import * as React from "react";
import * as Types from "./types";

declare function NewTaskCard(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  slotStatus?: Types.Devlink.Slot;
  slotTaskInput?: Types.Devlink.Slot;
}): React.JSX.Element;
