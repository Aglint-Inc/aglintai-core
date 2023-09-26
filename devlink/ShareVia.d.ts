import * as React from "react";
import * as Types from "./types";

declare function ShareVia(props: {
  as?: React.ElementType;
  onClickCopy?: Types.Devlink.RuntimeProps;
  slotVideo?: Types.Devlink.Slot;
  textGuide?: React.ReactNode;
  onClickShareLinkedIn?: Types.Devlink.RuntimeProps;
  onClickMail?: Types.Devlink.RuntimeProps;
  textLink?: React.ReactNode;
  isHowtoShareVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
