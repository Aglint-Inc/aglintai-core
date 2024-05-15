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
  isImportDescVisible?: Types.Visibility.VisibilityConditions;
  textListingCount?: React.ReactNode;
  onClickReupload?: Types.Devlink.RuntimeProps;
  isListingCountVisible?: Types.Visibility.VisibilityConditions;
  textCountExistinJob?: React.ReactNode;
  onClickImportRemaining?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
