import * as React from "react";
import * as Types from "./types";

declare function MyScheduleDash(props: {
  as?: React.ElementType;
  slotCompleted?: Types.Devlink.Slot;
  onClickIconCompleted?: Types.Devlink.RuntimeProps;
  onClickIconUpcoming?: Types.Devlink.RuntimeProps;
  slotUpcoming?: Types.Devlink.Slot;
}): React.JSX.Element;
