import * as React from "react";
import * as Types from "./types";

declare function MultiFilterLayout(props: {
  as?: React.ElementType;
  slotFilterItem?: Types.Devlink.Slot;
  onClickReset?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
