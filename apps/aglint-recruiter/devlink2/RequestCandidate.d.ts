import * as React from "react";
import * as Types from "./types";

declare function RequestCandidate(props: {
  as?: React.ElementType;
  slotStartDateInput?: Types.Devlink.Slot;
  slotEndDateInput?: Types.Devlink.Slot;
  slotMinNumberDays?: Types.Devlink.Slot;
  slotMinNumberSlot?: Types.Devlink.Slot;
  slotEmailTemplateHolder?: Types.Devlink.Slot;
}): React.JSX.Element;
