import * as React from "react";
import * as Types from "./types";

declare function AvatarCard(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  slotAvatarVideo?: Types.Devlink.Slot;
  textAvatarName?: React.ReactNode;
  isPause?: Types.Visibility.VisibilityConditions;
  isPlay?: Types.Visibility.VisibilityConditions;
  onClickPlayPause?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
