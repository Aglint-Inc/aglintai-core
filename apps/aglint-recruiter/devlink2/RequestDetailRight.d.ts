import * as React from "react";
import * as Types from "./types";

declare function RequestDetailRight(props: {
  as?: React.ElementType;
  slotPriority?: Types.Devlink.Slot;
  slotRequestType?: Types.Devlink.Slot;
  textDueDate?: React.ReactNode;
  slotAssignedTo?: Types.Devlink.Slot;
  slotCandidate?: Types.Devlink.Slot;
  slotRelatedJob?: Types.Devlink.Slot;
}): React.JSX.Element;
