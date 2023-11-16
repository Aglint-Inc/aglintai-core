import * as React from "react";
import * as Types from "./types";

declare function JobDescriptionModal(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickSearch?: Types.Devlink.RuntimeProps;
  slotJobDescription?: Types.Devlink.Slot;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
}): React.JSX.Element;
