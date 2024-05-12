import * as React from "react";
import * as Types from "./types";

declare function PanelMemberPill(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textMemberName?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  propsBgColor?: Types.Devlink.RuntimeProps;
  isCloseVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
