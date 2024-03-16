import * as React from "react";
import * as Types from "./types";

declare function ShadowSession(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotShadowSessionCard?: Types.Devlink.Slot;
}): React.JSX.Element;
