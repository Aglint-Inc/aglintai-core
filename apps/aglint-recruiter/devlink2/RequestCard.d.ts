import * as React from "react";
import * as Types from "./types";

declare function RequestCard(props: {
  as?: React.ElementType;
  slotBadgeNew?: Types.Devlink.Slot;
  isNewBadgeVisible?: Types.Visibility.VisibilityConditions;
  textTitle?: React.ReactNode;
  slotRightIcons?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
