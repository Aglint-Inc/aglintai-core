import * as React from "react";
import * as Types from "./types";

declare function AudioAvatarCard(props: {
  as?: React.ElementType;
  isAudioIconVisible?: Types.Visibility.VisibilityConditions;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotAvatar?: Types.Devlink.Slot;
  isPlayButtonVisible?: Types.Visibility.VisibilityConditions;
  isPauseButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickPlayPause?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
  textName?: React.ReactNode;
}): React.JSX.Element;
