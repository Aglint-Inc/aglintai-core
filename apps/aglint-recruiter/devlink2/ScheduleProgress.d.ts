import * as React from "react";
import * as Types from "./types";

declare function ScheduleProgress(props: {
  as?: React.ElementType;
  status?: Types.Builtin.Text;
  slotRequestIcon?: Types.Devlink.Slot;
  textProgress?: React.ReactNode;
  slotHoverIcon?: Types.Devlink.Slot;
  slotInput?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
