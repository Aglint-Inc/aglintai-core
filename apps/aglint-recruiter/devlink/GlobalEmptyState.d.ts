import * as React from "react";
import * as Types from "./types";

declare function GlobalEmptyState(props: {
  as?: React.ElementType;
  textDesc?: React.ReactNode;
  iconName?: React.ReactNode;
  backgroundColor?: Types.Builtin.Text;
  styleEmpty?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
