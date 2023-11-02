import * as React from "react";
import * as Types from "./types";

declare function AddScreeningQuestion(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  onClickAdd?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  isVideoVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
