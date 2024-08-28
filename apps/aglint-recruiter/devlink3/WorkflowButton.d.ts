import * as React from "react";
import * as Types from "./types";

declare function WorkflowButton(props: {
  as?: React.ElementType;
  onClickButton?: Types.Devlink.RuntimeProps;
  slotIcon?: Types.Devlink.Slot;
  textButton?: React.ReactNode;
}): React.JSX.Element;
