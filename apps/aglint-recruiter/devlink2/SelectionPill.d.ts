import * as React from "react";
import * as Types from "./types";

declare function SelectionPill(props: {
  as?: React.ElementType;
  isSelected?: Types.Visibility.VisibilityConditions;
  slotOption?: Types.Devlink.Slot;
  onClickSelected?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
