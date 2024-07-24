import * as React from "react";
import * as Types from "./types";

declare function TrainingSetting(props: {
  as?: React.ElementType;
  slotButton?: Types.Devlink.Slot;
  textHeading?: React.ReactNode;
  textShadow?: React.ReactNode;
  textReverseShadow?: React.ReactNode;
  slotApproval?: Types.Devlink.Slot;
  isEnable?: Types.Visibility.VisibilityConditions;
  textDisable?: React.ReactNode;
  isDisable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
