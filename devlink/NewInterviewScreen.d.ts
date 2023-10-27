import * as React from "react";
import * as Types from "./types";

declare function NewInterviewScreen(props: {
  as?: React.ElementType;
  slotInterviewLogo?: Types.Devlink.Slot;
  onClickTransscript?: Types.Devlink.RuntimeProps;
  onClickEndInterview?: Types.Devlink.RuntimeProps;
  slotInterviewLeft?: Types.Devlink.Slot;
  slotInterviewRight?: Types.Devlink.Slot;
  onClickSupport?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
