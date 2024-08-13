import * as React from "react";
import * as Types from "./types";

declare function UserInfoTeam(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  onClickLinkedIn?: Types.Devlink.RuntimeProps;
  isLinkedInVisible?: Types.Visibility.VisibilityConditions;
  textDesgination?: React.ReactNode;
  slotDetails?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
