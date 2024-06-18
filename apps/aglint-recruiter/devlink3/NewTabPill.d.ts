import * as React from "react";
import * as Types from "./types";

declare function NewTabPill(props: {
  as?: React.ElementType;
  isPillActive?: Types.Visibility.VisibilityConditions;
  onClickPill?: Types.Devlink.RuntimeProps;
  textLabel?: React.ReactNode;
  slotStartIcon?: Types.Devlink.Slot;
  slotEndIcon?: Types.Devlink.Slot;
  isEndIconVisible?: Types.Visibility.VisibilityConditions;
  isStartIconVisible?: Types.Visibility.VisibilityConditions;
  tabCount?: React.ReactNode;
  isTabCountVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
