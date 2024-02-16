import * as React from "react";
import * as Types from "./types";

declare function AvailabilitySlot(props: {
  as?: React.ElementType;
  slotTeamAvailabilityCard?: Types.Devlink.Slot;
  slotProgressLoader?: Types.Devlink.Slot;
}): React.JSX.Element;
