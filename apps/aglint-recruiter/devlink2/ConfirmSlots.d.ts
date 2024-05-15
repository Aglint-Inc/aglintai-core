import * as React from "react";
import * as Types from "./types";

declare function ConfirmSlots(props: {
  as?: React.ElementType;
  textDesc?: React.ReactNode;
  slotLoadedSlots?: Types.Devlink.Slot;
  textButtonLabel?: React.ReactNode;
  onClickConfirm?: Types.Devlink.RuntimeProps;
  isAvailabilityConfirmedVisible?: Types.Visibility.VisibilityConditions;
  isConfirmAvailibiltyVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
