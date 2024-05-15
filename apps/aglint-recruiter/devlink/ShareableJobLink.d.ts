import * as React from "react";
import * as Types from "./types";

declare function ShareableJobLink(props: {
  as?: React.ElementType;
  textLink?: React.ReactNode;
  onClickCopyLink?: Types.Devlink.RuntimeProps;
  onClickLinkedIn?: Types.Devlink.RuntimeProps;
  onClickMail?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
