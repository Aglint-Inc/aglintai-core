import * as React from "react";
import * as Types from "./types";

declare function ListCard(props: {
  as?: React.ElementType;
  slotAvatarWithName?: Types.Devlink.Slot;
  isAvatarWithNameVisible?: Types.Visibility.VisibilityConditions;
  textList?: React.ReactNode;
  isListVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
