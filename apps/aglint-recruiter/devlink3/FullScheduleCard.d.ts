import * as React from "react";
import * as Types from "./types";

declare function FullScheduleCard(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  slotGeneralScheduleCard?: Types.Devlink.Slot;
  isNotScheduledVisible?: Types.Visibility.VisibilityConditions;
  isCardSelected?: Types.Visibility.VisibilityConditions;
  textStatus?: React.ReactNode;
  isNotScheduleActive?: Types.Visibility.VisibilityConditions;
  isLineVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
