import * as React from "react";
import * as Types from "./types";

declare function PwResetForm(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  contactLink?: Types.Basic.Link;
  onclickReset?: Types.Devlink.RuntimeProps;
  onclickBack?: Types.Devlink.RuntimeProps;
  isDisable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
