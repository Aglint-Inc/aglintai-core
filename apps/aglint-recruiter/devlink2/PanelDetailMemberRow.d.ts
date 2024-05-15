import * as React from "react";
import * as Types from "./types";

declare function PanelDetailMemberRow(props: {
  as?: React.ElementType;
  slotMember?: Types.Devlink.Slot;
  slotBodyCells?: Types.Devlink.Slot;
}): React.JSX.Element;
