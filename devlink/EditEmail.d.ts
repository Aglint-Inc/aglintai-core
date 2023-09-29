import * as React from "react";
import * as Types from "./types";

declare function EditEmail(props: {
  as?: React.ElementType;
  textEmailName?: React.ReactNode;
  onClickSaveChanges?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotForm?: Types.Devlink.Slot;
}): React.JSX.Element;
