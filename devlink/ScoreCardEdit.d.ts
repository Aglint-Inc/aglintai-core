import * as React from "react";
import * as Types from "./types";

declare function ScoreCardEdit(props: {
  as?: React.ElementType;
  textEdit?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
  slotButtonUpdate?: Types.Devlink.Slot;
  slotCheckBox?: Types.Devlink.Slot;
  slotTextEdit?: Types.Devlink.Slot;
}): React.JSX.Element;
