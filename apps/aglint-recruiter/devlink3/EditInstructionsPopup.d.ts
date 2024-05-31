import * as React from "react";
import * as Types from "./types";

declare function EditInstructionsPopup(props: {
  as?: React.ElementType;
  slotrichtext?: Types.Devlink.Slot;
  onClickUpdate?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
