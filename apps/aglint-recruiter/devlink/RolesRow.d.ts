import * as React from "react";
import * as Types from "./types";

declare function RolesRow(props: {
  as?: React.ElementType;
  onClickRow?: Types.Devlink.RuntimeProps;
  textRole?: React.ReactNode;
  textDescription?: React.ReactNode;
  slotAvatars?: Types.Devlink.Slot;
}): React.JSX.Element;
