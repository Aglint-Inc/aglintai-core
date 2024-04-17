import * as React from "react";
import * as Types from "./types";

declare function CandidateCalender(props: {
  as?: React.ElementType;
  textMonth?: React.ReactNode;
  slotTimeZone?: Types.Devlink.Slot;
  slotDayColumn?: Types.Devlink.Slot;
  onClickLeft?: Types.Devlink.RuntimeProps;
  onClickRight?: Types.Devlink.RuntimeProps;
  isRightArrow?: Types.Visibility.VisibilityConditions;
  isLeftArrow?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
