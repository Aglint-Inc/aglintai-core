import * as React from "react";
import * as Types from "./types";

declare function GraphBlock(props: {
  as?: React.ElementType;
  slotDarkPillLocation?: Types.Devlink.Slot;
  slotLocationGraph?: Types.Devlink.Slot;
}): React.JSX.Element;
