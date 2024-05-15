import * as React from "react";
import * as Types from "./types";

declare function WidgetUserCard(props: {
  as?: React.ElementType;
  slotUserAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textEmail?: React.ReactNode;
  onClickUser?: Types.Devlink.RuntimeProps;
  isSelected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
