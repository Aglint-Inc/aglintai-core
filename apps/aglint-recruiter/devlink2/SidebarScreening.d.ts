import * as React from "react";
import * as Types from "./types";

declare function SidebarScreening(props: {
  as?: React.ElementType;
  slotStatus?: Types.Devlink.Slot;
  onclickArrow?: Types.Devlink.RuntimeProps;
  slotBody?: Types.Devlink.Slot;
}): React.JSX.Element;
