import * as React from "react";
import * as Types from "./types";

declare function UploadedVideo(props: {
  as?: React.ElementType;
  slotVideo?: Types.Devlink.Slot;
  onClickReupload?: Types.Devlink.RuntimeProps;
  onClickClear?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  isPlayIconVisible?: Types.Visibility.VisibilityConditions;
  isPauseIconVisible?: Types.Visibility.VisibilityConditions;
  onClickPlayPause?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
