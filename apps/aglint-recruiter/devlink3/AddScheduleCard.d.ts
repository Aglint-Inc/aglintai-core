import * as React from "react";
import * as Types from "./types";

declare function AddScheduleCard(props: {
  as?: React.ElementType;
  isAddSessionOptionVisible?: Types.Visibility.VisibilityConditions;
  slotAddScheduleOption?: Types.Devlink.Slot;
}): React.JSX.Element;
