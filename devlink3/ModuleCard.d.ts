import * as React from "react";
import * as Types from "./types";

declare function ModuleCard(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textDescription?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
  slotIcon?: Types.Devlink.Slot;
  slotEnableDisable?: Types.Devlink.Slot;
  isDescription?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
