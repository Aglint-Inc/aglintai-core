import * as React from "react";
import * as Types from "./types";

declare function ScrQuestionDefault(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textQuestion?: React.ReactNode;
  textOption?: React.ReactNode;
  isRequired?: Types.Visibility.VisibilityConditions;
  onclickEdit?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
