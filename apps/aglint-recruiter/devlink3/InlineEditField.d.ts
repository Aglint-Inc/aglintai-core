import * as React from "react";
import * as Types from "./types";

declare function InlineEditField(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  onClickDone?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;