import * as React from "react";
import * as Types from "./types";

declare function GroupedSlots(props: {
  as?: React.ElementType;
  slotTimeRange?: Types.Devlink.Slot;
  textDate?: React.ReactNode;
}): React.JSX.Element;
