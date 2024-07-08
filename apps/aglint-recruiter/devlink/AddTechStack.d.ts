import * as React from "react";
import * as Types from "./types";

declare function AddTechStack(props: {
  as?: React.ElementType;
  slotTechPills?: Types.Devlink.Slot;
  slotInput?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  slotClose?: Types.Devlink.Slot;
}): React.JSX.Element;
