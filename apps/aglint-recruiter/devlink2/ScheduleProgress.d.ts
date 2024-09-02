import * as React from "react";
import * as Types from "./types";

declare function ScheduleProgress(props: {
  as?: React.ElementType;
  status?: Types.Builtin.Text;
  slotRequestIcon?: Types.Devlink.Slot;
  textProgress?: React.ReactNode;
  slotHoverIcon?: Types.Devlink.Slot;
  slotAiText?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  slotLoader?: Types.Devlink.Slot;
  isAiTextVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
