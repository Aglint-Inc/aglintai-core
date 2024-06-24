import * as React from "react";
import * as Types from "./types";

declare function PreviewEmail(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotContent?: Types.Devlink.Slot;
}): React.JSX.Element;
