import * as React from "react";
import * as Types from "./types";

declare function AddLocationPop(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickAdd?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
