import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseEmpty(props: {
  as?: React.ElementType;
  onClickImportCandidates?: Types.Devlink.RuntimeProps;
  onClickLeverImport?: Types.Devlink.RuntimeProps;
  onClickGreenHouseImport?: Types.Devlink.RuntimeProps;
  onClickAshbyImport?: Types.Devlink.RuntimeProps;
  onClickDbRequest?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
