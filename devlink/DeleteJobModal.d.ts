import * as React from "react";
import * as Types from "./types";

declare function DeleteJobModal(props: {
  as?: React.ElementType;
  textJobTitle?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
