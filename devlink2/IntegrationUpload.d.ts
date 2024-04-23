import * as React from "react";
import * as Types from "./types";

declare function IntegrationUpload(props: {
  as?: React.ElementType;
  onClickDragUpload?: Types.Devlink.RuntimeProps;
  onClickGetJson?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
