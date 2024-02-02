import * as React from "react";
import * as Types from "./types";

declare function DashboardMenu(props: {
  as?: React.ElementType;
  onClickCandidateList?: Types.Devlink.RuntimeProps;
  onClickEditJobDetails?: Types.Devlink.RuntimeProps;
  onClickImportCandidates?: Types.Devlink.RuntimeProps;
  onClickViewJob?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
