import * as React from "react";
import * as Types from "./types";

declare function DeletePopup(props: {
  as?: React.ElementType;
  textDescription?: React.ReactNode;
  textTitle?: React.ReactNode;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
