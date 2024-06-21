import * as React from "react";
import * as Types from "./types";

declare function ScoreCardEdit(props: {
  as?: React.ElementType;
  onClickDelete?: Types.Devlink.RuntimeProps;
  slotButtonUpdate?: Types.Devlink.Slot;
  slotCheckBox?: Types.Devlink.Slot;
  slotTextEdit?: Types.Devlink.Slot;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
  onClickCancel?: Types.Devlink.RuntimeProps;
  isCancelVisible?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
