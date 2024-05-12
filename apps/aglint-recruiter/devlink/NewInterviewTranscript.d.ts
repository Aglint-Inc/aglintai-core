import * as React from "react";
import * as Types from "./types";

declare function NewInterviewTranscript(props: {
  as?: React.ElementType;
  slotInterviewTranscript?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
