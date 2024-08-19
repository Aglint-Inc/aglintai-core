import * as React from "react";
import * as Types from "./types";

declare function RequestDetail(props: {
  as?: React.ElementType;
  slotInterview?: Types.Devlink.Slot;
  slotNewTask?: Types.Devlink.Slot;
  slotRequestDetailRight?: Types.Devlink.Slot;
  slotBannerReq?: Types.Devlink.Slot;
  isBannerVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
