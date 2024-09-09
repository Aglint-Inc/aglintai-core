import * as React from "react";
import * as Types from "./types";

declare function PhoneScreenSuccess(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  slotLottie?: Types.Devlink.Slot;
  textSuccess?: React.ReactNode;
  textSubmitted?: React.ReactNode;
  onClickSupport?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;