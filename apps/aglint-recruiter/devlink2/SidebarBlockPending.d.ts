import * as React from "react";
import * as Types from "./types";

declare function SidebarBlockPending(props: {
  as?: React.ElementType;
  textScheduleName?: React.ReactNode;
  onClickResendInvite?: Types.Devlink.RuntimeProps;
  slotScheduleInfoBlock?: Types.Devlink.Slot;
  textSlotNumber?: React.ReactNode;
  slorGroupedSlots?: Types.Devlink.Slot;
  slotInterviewPanel?: Types.Devlink.Slot;
}): React.JSX.Element;
