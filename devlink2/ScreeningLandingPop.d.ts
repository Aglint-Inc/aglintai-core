import * as React from "react";
import * as Types from "./types";

declare function ScreeningLandingPop(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotScreeningNameInput?: Types.Devlink.Slot;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  textHeading?: React.ReactNode;
  textLabel?: React.ReactNode;
  slotDropdown?: Types.Devlink.Slot;
}): React.JSX.Element;
