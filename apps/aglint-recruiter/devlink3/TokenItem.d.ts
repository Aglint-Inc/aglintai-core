import * as React from "react";
import * as Types from "./types";

declare function TokenItem(props: {
  as?: React.ElementType;
  slotBadge?: Types.Devlink.Slot;
  textTokenDetail?: React.ReactNode;
}): React.JSX.Element;
