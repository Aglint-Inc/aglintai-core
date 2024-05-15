import * as React from "react";
import * as Types from "./types";

declare function FilterItem(props: {
  as?: React.ElementType;
  onClickFIlter?: Types.Devlink.RuntimeProps;
  textFilter?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
