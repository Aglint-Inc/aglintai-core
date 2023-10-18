import * as React from "react";
import * as Types from "./types";

declare function ImportCandidates(props: {
  as?: React.ElementType;
  onClickDownloadSample?: Types.Devlink.RuntimeProps;
  onClickBrowse?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
