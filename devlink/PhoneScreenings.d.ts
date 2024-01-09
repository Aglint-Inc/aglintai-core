import * as React from "react";
import * as Types from "./types";

declare function PhoneScreenings(props: {
  as?: React.ElementType;
  isPrevDisable?: Types.Visibility.VisibilityConditions;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  slotStep?: Types.Devlink.Slot;
  isPreviewEnable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
