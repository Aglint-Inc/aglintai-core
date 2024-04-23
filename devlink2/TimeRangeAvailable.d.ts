import * as React from "react";
import * as Types from "./types";

declare function TimeRangeAvailable(props: {
  as?: React.ElementType;
  onClickPill?: Types.Devlink.RuntimeProps;
  textTimeRange?: React.ReactNode;
  isSelected?: Types.Visibility.VisibilityConditions;
  slotAvatarGroup?: Types.Devlink.Slot;
  isAvatarGroup?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
