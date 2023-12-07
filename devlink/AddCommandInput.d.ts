import * as React from "react";
import * as Types from "./types";

declare function AddCommandInput(props: {
  as?: React.ElementType;
  onClickDelete?: Types.Devlink.RuntimeProps;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDone?: Types.Devlink.RuntimeProps;
  slotInputCommand?: Types.Devlink.Slot;
}): React.JSX.Element;
