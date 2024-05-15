import * as React from "react";
import * as Types from "./types";

declare function SelectedPopup(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotTitle?: Types.Devlink.Slot;
  slotBody?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
}): React.JSX.Element;
