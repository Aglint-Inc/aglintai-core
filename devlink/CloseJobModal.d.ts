import * as React from "react";
import * as Types from "./types";

declare function CloseJobModal(props: {
  as?: React.ElementType;
  textJobTitle?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
  onClickCloseJob?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
