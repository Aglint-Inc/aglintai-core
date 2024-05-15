import * as React from "react";
import * as Types from "./types";

declare function CandidateStatusDropdown(props: {
  as?: React.ElementType;
  slotOptions?: Types.Devlink.Slot;
  title?: React.ReactNode;
  onClick?: Types.Devlink.RuntimeProps;
  arrowProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
