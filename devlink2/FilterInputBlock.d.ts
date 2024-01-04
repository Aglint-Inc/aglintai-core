import * as React from "react";
import * as Types from "./types";

declare function FilterInputBlock(props: {
  as?: React.ElementType;
  isChecked?: Types.Visibility.VisibilityConditions;
  onclickCheckbox?: Types.Devlink.RuntimeProps;
  labelText?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
}): React.JSX.Element;
