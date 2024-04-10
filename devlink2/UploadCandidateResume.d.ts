import * as React from "react";
import * as Types from "./types";

declare function UploadCandidateResume(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotDrag?: Types.Devlink.Slot;
  slotUploadButton?: Types.Devlink.Slot;
}): React.JSX.Element;
