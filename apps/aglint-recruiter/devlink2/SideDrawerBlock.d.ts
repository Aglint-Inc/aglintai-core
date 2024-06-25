import * as React from "react";
import * as Types from "./types";

declare function SideDrawerBlock(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotSidedrawerBody?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
