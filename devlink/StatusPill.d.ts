import * as React from "react";
import * as Types from "./types";

declare function StatusPill(props: {
  as?: React.ElementType;
  colorBgPropsStatus?: Types.Devlink.RuntimeProps;
  textStatus?: React.ReactNode;
}): React.JSX.Element;
