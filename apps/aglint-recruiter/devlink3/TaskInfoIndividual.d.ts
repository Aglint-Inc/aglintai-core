import * as React from "react";
import * as Types from "./types";

declare function TaskInfoIndividual(props: {
  as?: React.ElementType;
  slotInfoData?: Types.Devlink.Slot;
  onClickInfo?: Types.Devlink.RuntimeProps;
  isClickable?: Types.Visibility.VisibilityConditions;
  iconName?: React.ReactNode;
  textInfoName?: React.ReactNode;
  slotIconButton?: Types.Devlink.Slot;
}): React.JSX.Element;
