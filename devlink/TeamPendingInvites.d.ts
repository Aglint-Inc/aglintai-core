import * as React from "react";
import * as Types from "./types";

declare function TeamPendingInvites(props: {
  as?: React.ElementType;
  slotList?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
