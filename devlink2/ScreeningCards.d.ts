import * as React from "react";
import * as Types from "./types";

declare function ScreeningCards(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  isCheckboxVisible?: Types.Visibility.VisibilityConditions;
  slotCheckbox?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  slotInviteStatus?: Types.Devlink.Slot;
  textScreeningName?: React.ReactNode;
  textRelatedJob?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
