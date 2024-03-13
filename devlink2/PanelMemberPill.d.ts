import * as React from "react";
import * as Types from "./types";

declare function PanelMemberPill(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textMemberName?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  propsBgColor?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
