import * as React from "react";
import * as Types from "./types";

declare function CustomTab(props: {
  as?: React.ElementType;
  slotTabContent?: Types.Devlink.Slot;
  slotTabMenu?: Types.Devlink.Slot;
}): React.JSX.Element;
