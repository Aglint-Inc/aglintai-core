import * as React from "react";
import * as Types from "./types";

declare function AvatarModal(props: {
  as?: React.ElementType;
  slotVideo?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickPlayPause?: Types.Devlink.RuntimeProps;
  isPlayIconVisible?: Types.Visibility.VisibilityConditions;
  isPauseIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
