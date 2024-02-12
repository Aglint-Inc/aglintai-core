import * as React from "react";
import * as Types from "./types";

declare function SidebarViewSlots(props: {
  as?: React.ElementType;
  slotPanelMember?: Types.Devlink.Slot;
  textRequestedSlotsNumber?: React.ReactNode;
  textConfirmedSlotsNumber?: React.ReactNode;
  slotConfirmedSlots?: Types.Devlink.Slot;
  slotRequestedSlots?: Types.Devlink.Slot;
  onClickResendRequest?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
