import * as React from "react";
import * as Types from "./types";

declare function CandidateFilterBody(props: {
  as?: React.ElementType;
  slotFilters?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
}): React.JSX.Element;
