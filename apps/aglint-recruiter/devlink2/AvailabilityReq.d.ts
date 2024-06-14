import * as React from "react";
import * as Types from "./types";

declare function AvailabilityReq(props: {
  as?: React.ElementType;
  slotPickSlotDay?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
}): React.JSX.Element;
