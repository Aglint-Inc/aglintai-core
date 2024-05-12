import * as React from "react";
import * as Types from "./types";

declare function AvailableSlots(props: {
  as?: React.ElementType;
  slotLoadedSlotPill?: Types.Devlink.Slot;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
}): React.JSX.Element;
