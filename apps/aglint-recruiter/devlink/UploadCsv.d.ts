import * as React from "react";
import * as Types from "./types";

declare function UploadCsv(props: {
  as?: React.ElementType;
  onClickImportFile?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
