import * as React from "react";
import * as Types from "./types";

declare function DetailedFeedback(props: {
  as?: React.ElementType;
  onClickBack?: Types.Devlink.RuntimeProps;
  slotDetailedFeedback?: Types.Devlink.Slot;
  slotTranscript?: Types.Devlink.Slot;
}): React.JSX.Element;
