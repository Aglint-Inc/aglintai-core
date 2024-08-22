import * as React from "react";
import * as Types from "./types";

declare function AssignedToList(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
