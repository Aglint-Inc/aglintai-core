import * as React from "react";
import * as Types from "./types";

declare function ImportCandidatesModal(props: {
  as?: React.ElementType;
  onClickDownloadSample?: Types.Devlink.RuntimeProps;
  onClickImportFromFiles?: Types.Devlink.RuntimeProps;
  onClickAddManually?: Types.Devlink.RuntimeProps;
  isImportFilesActive?: Types.Visibility.VisibilityConditions;
  isAddManuallyActive?: Types.Visibility.VisibilityConditions;
  onClickBrowse?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  propsDrag?: Types.Devlink.RuntimeProps;
  slotImport?: Types.Devlink.Slot;
}): React.JSX.Element;
