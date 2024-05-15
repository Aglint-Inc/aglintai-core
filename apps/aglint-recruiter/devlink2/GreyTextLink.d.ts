import * as React from "react";
import * as Types from "./types";

declare function GreyTextLink(props: {
  as?: React.ElementType;
  textLink?: React.ReactNode;
  onClickLink?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
