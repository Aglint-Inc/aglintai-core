import * as React from "react";
import * as Types from "./types";

declare function CreateNewJobDrawer(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotNewJobStep?: Types.Devlink.Slot;
}): React.JSX.Element;
