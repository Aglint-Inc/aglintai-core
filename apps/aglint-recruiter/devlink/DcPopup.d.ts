import * as React from "react";
import * as Types from "./types";

declare function DcPopup(props: {
  as?: React.ElementType;
  slotButtons?: Types.Devlink.Slot;
  slotBody?: Types.Devlink.Slot;
  popupName?: React.ReactNode;
  onClickClosePopup?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
