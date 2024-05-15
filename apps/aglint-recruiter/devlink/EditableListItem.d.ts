import * as React from "react";
import * as Types from "./types";

declare function EditableListItem(props: {
  as?: React.ElementType;
  colorBlackText?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickSave?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  slotInput?: Types.Devlink.Slot;
}): React.JSX.Element;
