import * as React from "react";
import * as Types from "./types";

declare function SoundTask(props: {
  as?: React.ElementType;
  slotAudioPlay?: Types.Devlink.Slot;
  slotTranscript?: Types.Devlink.Slot;
  isShowVisible?: Types.Visibility.VisibilityConditions;
  onClickShow?: Types.Devlink.RuntimeProps;
  isHideVisible?: Types.Visibility.VisibilityConditions;
  onClickHide?: Types.Devlink.RuntimeProps;
  isAudioPlayVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
