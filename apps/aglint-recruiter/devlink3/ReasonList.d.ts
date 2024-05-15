import * as React from "react";
import * as Types from "./types";

declare function ReasonList(props: {
  as?: React.ElementType;
  textReason?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
