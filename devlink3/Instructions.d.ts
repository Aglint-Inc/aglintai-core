import * as React from "react";
import * as Types from "./types";

declare function Instructions(props: {
  as?: React.ElementType;
  slotToggleButton?: Types.Devlink.Slot;
  slotInstructions?: Types.Devlink.Slot;
  onClickGotit?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  isHowWorkVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
