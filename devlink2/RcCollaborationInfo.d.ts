import * as React from "react";
import * as Types from "./types";

declare function RcCollaborationInfo(props: {
  as?: React.ElementType;
  slotForms?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
  onclickAdd?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
