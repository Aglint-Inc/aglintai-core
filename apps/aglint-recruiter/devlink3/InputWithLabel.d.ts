import * as React from "react";
import * as Types from "./types";

declare function InputWithLabel(props: {
  as?: React.ElementType;
  textFieldName?: React.ReactNode;
  slotInput?: Types.Devlink.Slot;
  isDescription?: Types.Visibility.VisibilityConditions;
  isAddDynamic?: Types.Visibility.VisibilityConditions;
  textDescription?: React.ReactNode;
}): React.JSX.Element;
