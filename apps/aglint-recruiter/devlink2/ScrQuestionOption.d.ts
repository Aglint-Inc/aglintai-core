import * as React from "react";
import * as Types from "./types";

declare function ScrQuestionOption(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  text?: React.ReactNode;
  isAddIconVisible?: Types.Visibility.VisibilityConditions;
  isTicked?: Types.Visibility.VisibilityConditions;
  onclickOption?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
