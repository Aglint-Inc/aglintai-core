import * as React from "react";
import * as Types from "./types";

declare function PanelBlock(props: {
  as?: React.ElementType;
  textPanelName?: React.ReactNode;
  slotPanelIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
