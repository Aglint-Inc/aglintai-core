import * as React from "react";
import * as Types from "./types";

declare function ModuleCard(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
  slotIcon?: Types.Devlink.Slot;
  slotEnableDisable?: Types.Devlink.Slot;
  isWarning?: Types.Visibility.VisibilityConditions;
  isAlert?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
