import * as React from "react";
import * as Types from "./types";

declare function SelectedMemberPill(props: {
  as?: React.ElementType;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  isShadow?: Types.Visibility.VisibilityConditions;
  slotMemberAvatar?: Types.Devlink.Slot;
  onClickRemove?: Types.Devlink.RuntimeProps;
  textMemberName?: React.ReactNode;
  isCloseButton?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
