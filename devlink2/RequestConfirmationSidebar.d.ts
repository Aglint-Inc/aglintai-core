import * as React from "react";
import * as Types from "./types";

declare function RequestConfirmationSidebar(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotSelectedSlots?: Types.Devlink.Slot;
}): React.JSX.Element;
