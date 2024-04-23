import * as React from "react";
import * as Types from "./types";

declare function CandidateDetailSidebar(props: {
  as?: React.ElementType;
  slotSidebarContent?: Types.Devlink.Slot;
  textCandidateName?: Types.Devlink.Slot;
  slotAvatar?: Types.Devlink.Slot;
  onClickLeft?: Types.Devlink.RuntimeProps;
  onClickRight?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  textScheduleName?: React.ReactNode;
}): React.JSX.Element;
