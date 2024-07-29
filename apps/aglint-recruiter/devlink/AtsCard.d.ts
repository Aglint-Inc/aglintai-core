import * as React from "react";
import * as Types from "./types";

declare function AtsCard(props: {
  as?: React.ElementType;
  textStatus?: React.ReactNode;
  textRole?: React.ReactNode;
  textWorktypeLocation?: React.ReactNode;
  propsTextColor?: Types.Devlink.RuntimeProps;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotGlobalBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
