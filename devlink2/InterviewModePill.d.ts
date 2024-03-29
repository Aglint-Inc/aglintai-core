import * as React from "react";
import * as Types from "./types";

declare function InterviewModePill(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  slotModeIcon?: Types.Devlink.Slot;
  textModeName?: React.ReactNode;
  onClickPill?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
