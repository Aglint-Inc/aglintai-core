import * as React from "react";
import * as Types from "./types";

declare function ConfirmSlotPop(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textMonth?: React.ReactNode;
  textTitle?: React.ReactNode;
  textTime?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  onClickConfirm?: Types.Devlink.RuntimeProps;
  slotConfirmButton?: Types.Devlink.Slot;
}): React.JSX.Element;
