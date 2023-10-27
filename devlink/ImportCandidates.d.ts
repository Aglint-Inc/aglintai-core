import * as React from "react";
import * as Types from "./types";

declare function ImportCandidates(props: {
  as?: React.ElementType;
  slotImportCsv?: Types.Devlink.Slot;
  slotImportResume?: Types.Devlink.Slot;
  slotAddManually?: Types.Devlink.Slot;
  onClickImportCsv?: Types.Devlink.RuntimeProps;
  onClickImportResume?: Types.Devlink.RuntimeProps;
  onClickAddManually?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickDownloadSample?: Types.Devlink.RuntimeProps;
  onClickDownloadFiles?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
