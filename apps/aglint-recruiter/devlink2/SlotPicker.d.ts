import * as React from "react";
import * as Types from "./types";

declare function SlotPicker(props: {
  as?: React.ElementType;
  textDateHeading?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotTime?: Types.Devlink.Slot;
  isCloseButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
