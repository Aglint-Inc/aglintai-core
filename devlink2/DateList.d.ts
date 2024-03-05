import * as React from "react";
import * as Types from "./types";

declare function DateList(props: {
  as?: React.ElementType;
  textDate?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
