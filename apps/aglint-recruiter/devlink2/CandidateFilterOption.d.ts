import * as React from "react";
import * as Types from "./types";

declare function CandidateFilterOption(props: {
  as?: React.ElementType;
  onclickRemove?: Types.Devlink.RuntimeProps;
  slotInputs?: Types.Devlink.Slot;
}): React.JSX.Element;
