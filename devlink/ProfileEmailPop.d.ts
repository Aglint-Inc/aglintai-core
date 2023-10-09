import * as React from "react";
import * as Types from "./types";

declare function ProfileEmailPop(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotInput?: Types.Devlink.Slot;
  onClickSendLink?: Types.Devlink.RuntimeProps;
  changeText?: React.ReactNode;
}): React.JSX.Element;
