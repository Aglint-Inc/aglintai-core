import * as React from "react";
import * as Types from "./types";

declare function OptionInput(props: {
  as?: React.ElementType;
  slotOptionInput?: Types.Devlink.Slot;
  testOptionNumber?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotRcCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
