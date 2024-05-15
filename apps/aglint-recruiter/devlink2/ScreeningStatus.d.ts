import * as React from "react";
import * as Types from "./types";

declare function ScreeningStatus(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textStatus?: React.ReactNode;
  textDuration?: React.ReactNode;
  isDurationVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
