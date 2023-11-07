import * as React from "react";
import * as Types from "./types";

declare function RecLoginPage(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  onclickLogin?: Types.Devlink.RuntimeProps;
  contactLink?: Types.Basic.Link;
  onclickGoogle?: Types.Devlink.RuntimeProps;
  onclickLinkedIn?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
