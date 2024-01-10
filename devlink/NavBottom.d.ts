import * as React from "react";
import * as Types from "./types";

declare function NavBottom(props: {
  as?: React.ElementType;
  onClickLogout?: Types.Devlink.RuntimeProps;
  onClickProfile?: Types.Devlink.RuntimeProps;
  slotProfile?: Types.Devlink.Slot;
}): React.JSX.Element;
