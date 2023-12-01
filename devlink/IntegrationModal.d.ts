import * as React from "react";
import * as Types from "./types";

declare function IntegrationModal(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickContinue?: Types.Devlink.RuntimeProps;
  slotSearch?: Types.Devlink.Slot;
  slotApiKey?: Types.Devlink.Slot;
  slotLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
