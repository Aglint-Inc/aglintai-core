import * as React from "react";
import * as Types from "./types";

declare function ActiveList(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textList?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
