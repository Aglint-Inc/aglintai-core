import * as React from "react";
import * as Types from "./types";

declare function FilterOption(props: {
  as?: React.ElementType;
  onClickCancelInvite?: Types.Devlink.RuntimeProps;
  isCancelInviteVisible?: Types.Visibility.VisibilityConditions;
  slotIcon?: Types.Devlink.Slot;
  text?: React.ReactNode;
  color?: Types.Builtin.Text;
}): React.JSX.Element;
