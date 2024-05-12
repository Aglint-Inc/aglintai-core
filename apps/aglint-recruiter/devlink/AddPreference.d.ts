import * as React from "react";
import * as Types from "./types";

declare function AddPreference(props: {
  as?: React.ElementType;
  textPreference?: React.ReactNode;
  onClickAddPreference?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
