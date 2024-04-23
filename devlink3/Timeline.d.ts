import * as React from "react";
import * as Types from "./types";

declare function Timeline(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textTime?: React.ReactNode;
  textTitle?: React.ReactNode;
  isConnecterVisible?: Types.Visibility.VisibilityConditions;
  slotStatusIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
