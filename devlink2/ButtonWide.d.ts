import * as React from "react";
import * as Types from "./types";

declare function ButtonWide(props: {
  as?: React.ElementType;
  isEnabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLoader?: Types.Devlink.Slot;
  textButton?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
