import * as React from "react";
import * as Types from "./types";

declare function AddButton(props: {
  as?: React.ElementType;
  onClickAdd?: Types.Devlink.RuntimeProps;
  textAddButton?: React.ReactNode;
}): React.JSX.Element;
