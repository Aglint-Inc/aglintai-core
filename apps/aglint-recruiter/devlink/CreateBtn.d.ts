import * as React from "react";
import * as Types from "./types";

declare function CreateBtn(props: {
  as?: React.ElementType;
  skillText?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
