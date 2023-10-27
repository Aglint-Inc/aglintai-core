import * as React from "react";
import * as Types from "./types";

declare function ImportCandidatesModal(props: {
  as?: React.ElementType;
  onClickDownloadSample?: Types.Devlink.RuntimeProps;
  onClickImportCsv?: Types.Devlink.RuntimeProps;
  onClickAddManually?: Types.Devlink.RuntimeProps;
  isImportCsvActive?: Types.Visibility.VisibilityConditions;
  isAddManuallyActive?: Types.Visibility.VisibilityConditions;
  onClickBrowse?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  propsDrag?: Types.Devlink.RuntimeProps;
  slotImport?: Types.Devlink.Slot;
  onClickImportResume?: Types.Devlink.RuntimeProps;
  isImportResumeActive?: Types.Visibility.VisibilityConditions;
  slotImportCsv?: Types.Devlink.Slot;
  slotImportResume?: Types.Devlink.Slot;
  slotAddManually?: Types.Devlink.Slot;
}): React.JSX.Element;
