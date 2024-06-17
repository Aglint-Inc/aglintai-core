import * as React from "react";
import * as Types from "./types";

declare function SelectedSlot(props: {
  as?: React.ElementType;
  textDate?: React.ReactNode;
  slotBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
