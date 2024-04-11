import * as React from "react";
import * as Types from "./types";

declare function NewMyScheduleCard(props: {
  as?: React.ElementType;
  slotMyScheduleSubCard?: Types.Devlink.Slot;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  isNotScheduledIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
