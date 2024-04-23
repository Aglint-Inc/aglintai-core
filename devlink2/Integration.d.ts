import * as React from "react";
import * as Types from "./types";

declare function Integration(props: {
  as?: React.ElementType;
  slotHrTools?: Types.Devlink.Slot;
  slotScheduling?: Types.Devlink.Slot;
  slotMessaging?: Types.Devlink.Slot;
}): React.JSX.Element;
