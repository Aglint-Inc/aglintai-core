import * as React from "react";
import * as Types from "./types";

declare function DetailedFeedback(props: {
  as?: React.ElementType;
  onClickShare?: Types.Devlink.RuntimeProps;
  onClickDownloadFeedback?: Types.Devlink.RuntimeProps;
  onClickBack?: Types.Devlink.RuntimeProps;
  slotDetailedFeedback?: Types.Devlink.Slot;
}): React.JSX.Element;
