import * as React from "react";
import * as Types from "./types";

declare function UserNameRoleCard(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  slotImage?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
  borderStyle?: Types.Builtin.Text;
}): React.JSX.Element;
