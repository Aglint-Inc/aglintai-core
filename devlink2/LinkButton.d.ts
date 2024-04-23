import * as React from "react";
import * as Types from "./types";

declare function LinkButton(props: {
  as?: React.ElementType;
  onClcikButton?: Types.Devlink.RuntimeProps;
  textButton?: React.ReactNode;
}): React.JSX.Element;
