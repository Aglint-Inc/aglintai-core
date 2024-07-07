import * as React from "react";
import * as Types from "./types";

declare function JobDescriptionModal(props: {
  as?: React.ElementType;
  slotJobDescription?: Types.Devlink.Slot;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  slotClose?: Types.Devlink.Slot;
}): React.JSX.Element;
