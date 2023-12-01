import * as React from "react";
import * as Types from "./types";

declare function RevertChangesModal(props: {
  as?: React.ElementType;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickRevertChanges?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
