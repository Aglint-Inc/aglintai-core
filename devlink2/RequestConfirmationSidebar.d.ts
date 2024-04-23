import * as React from "react";
import * as Types from "./types";

declare function RequestConfirmationSidebar(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotSelectedSlots?: Types.Devlink.Slot;
  onClickRequest?: Types.Devlink.RuntimeProps;
  textSelectedInfo?: React.ReactNode;
}): React.JSX.Element;
