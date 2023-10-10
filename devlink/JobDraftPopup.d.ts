import * as React from "react";
import * as Types from "./types";

declare function JobDraftPopup(props: {
  as?: React.ElementType;
  onClickDraft?: Types.Devlink.RuntimeProps;
  onClickDiscard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
