import * as React from "react";
import * as Types from "./types";

declare function FilterPill(props: {
  as?: React.ElementType;
  textFilterName?: React.ReactNode;
  onClickFilter?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
