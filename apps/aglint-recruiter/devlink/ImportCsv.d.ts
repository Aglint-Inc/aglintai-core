import * as React from "react";
import * as Types from "./types";

declare function ImportCsv(props: {
  as?: React.ElementType;
  isListingCountVisible?: Types.Visibility.VisibilityConditions;
  textListingCount?: React.ReactNode;
  isImportDescVisible?: Types.Visibility.VisibilityConditions;
  textCountExistinJob?: React.ReactNode;
  onClickImportRemaining?: Types.Devlink.RuntimeProps;
  slotImportCandidatesCsv?: Types.Devlink.Slot;
  slotReuploadButton?: Types.Devlink.Slot;
  isExistWarningVisible?: Types.Visibility.VisibilityConditions;
  onClickImport?: Types.Devlink.RuntimeProps;
  isImportButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
