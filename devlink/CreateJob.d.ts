import * as React from "react";
import * as Types from "./types";

declare function CreateJob(props: {
  as?: React.ElementType;
  onClickCreateNewJob?: Types.Devlink.RuntimeProps;
  onClickLeverImport?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
