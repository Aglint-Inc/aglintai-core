import * as React from "react";
import * as Types from "./types";

declare function PanelDetailTitle(props: {
  as?: React.ElementType;
  textYearMonth?: React.ReactNode;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  isSlotSelected?: Types.Visibility.VisibilityConditions;
  onClickDeselect?: Types.Devlink.RuntimeProps;
  slotNumber?: Types.Devlink.Slot;
  slotSelectedAvatarGroup?: Types.Devlink.Slot;
  onClickConfirm?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
