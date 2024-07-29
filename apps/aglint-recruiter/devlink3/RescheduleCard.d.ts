import * as React from "react";
import * as Types from "./types";

declare function RescheduleCard(props: {
  as?: React.ElementType;
  textReason?: React.ReactNode;
  bgColorProps?: Types.Devlink.RuntimeProps;
  slotDateReason?: Types.Devlink.Slot;
  slotAdditionalNotes?: Types.Devlink.Slot;
  isNotesVisible?: Types.Visibility.VisibilityConditions;
  isDateVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
