import * as React from "react";
import * as Types from "./types";

declare function MultidayCard(props: {
  as?: React.ElementType;
  isSelected?: Types.Visibility.VisibilityConditions;
  slotSessionInfo?: Types.Devlink.Slot;
  slotChangeButton?: Types.Devlink.Slot;
  slotPickDateButton?: Types.Devlink.Slot;
  slotSelected?: Types.Devlink.Slot;
  textDayCount?: React.ReactNode;
  textTotalDuration?: React.ReactNode;
  textSelectedSlots?: React.ReactNode;
}): React.JSX.Element;
