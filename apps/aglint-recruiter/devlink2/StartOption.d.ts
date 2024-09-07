import * as React from "react";
import * as Types from "./types";

declare function StartOption(props: {
  as?: React.ElementType;
  slotText?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
