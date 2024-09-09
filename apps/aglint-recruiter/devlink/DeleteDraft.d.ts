import * as React from "react";
import * as Types from "./types";

declare function DeleteDraft(props: {
  as?: React.ElementType;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickClear?: Types.Devlink.RuntimeProps;
  textDeleteDraft?: React.ReactNode;
  textHeader?: React.ReactNode;
}): React.JSX.Element;