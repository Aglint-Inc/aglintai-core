import * as React from "react";
import * as Types from "./types";

declare function ReqCompleted(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textDesc?: React.ReactNode;
  onClickArrow?: Types.Devlink.RuntimeProps;
  slotTextwithIcon?: Types.Devlink.Slot;
  isDetailListVisible?: Types.Visibility.VisibilityConditions;
  isDropIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
