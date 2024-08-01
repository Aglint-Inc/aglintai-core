import * as React from "react";
import * as Types from "./types";

declare function RequestCardDetail(props: {
  as?: React.ElementType;
  slotButton?: Types.Devlink.Slot;
  slotRightText?: Types.Devlink.Slot;
  slotTextWithIconDetail?: Types.Devlink.Slot;
  slotBody?: Types.Devlink.Slot;
  isBodyVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
