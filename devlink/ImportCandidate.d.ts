import * as React from "react";
import * as Types from "./types";

declare function ImportCandidate(props: {
  as?: React.ElementType;
  slotUpload?: Types.Devlink.Slot;
  isImportDisable?: Types.Visibility.VisibilityConditions;
  onClickImport?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotDownload?: Types.Devlink.Slot;
  slotReuploadBtn?: Types.Devlink.Slot;
}): React.JSX.Element;
