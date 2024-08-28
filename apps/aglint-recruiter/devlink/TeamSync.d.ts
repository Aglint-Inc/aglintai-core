import * as React from "react";
import * as Types from "./types";

declare function TeamSync(props: {
  as?: React.ElementType;
  textSync?: React.ReactNode;
  onClickSync?: Types.Devlink.RuntimeProps;
  onClickMore?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
