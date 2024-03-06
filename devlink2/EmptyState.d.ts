import * as React from "react";
import * as Types from "./types";

declare function EmptyState(props: {
  as?: React.ElementType;
  textDescription?: React.ReactNode;
  slotIcons?: Types.Devlink.Slot;
}): React.JSX.Element;
