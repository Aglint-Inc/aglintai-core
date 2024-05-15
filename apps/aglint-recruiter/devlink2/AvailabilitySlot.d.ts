import * as React from "react";
import * as Types from "./types";

declare function AvailabilitySlot(props: {
  as?: React.ElementType;
  slotTeamAvailabilityCard?: Types.Devlink.Slot;
  slotProgressLoader?: Types.Devlink.Slot;
  textHeader?: React.ReactNode;
  textMessage1?: React.ReactNode;
  isUserSlotVisible?: Types.Visibility.VisibilityConditions;
  isWaitingResponseVisible?: Types.Visibility.VisibilityConditions;
  isMessage1Visible?: Types.Visibility.VisibilityConditions;
  textMessage2?: React.ReactNode;
}): React.JSX.Element;
