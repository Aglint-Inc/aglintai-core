import * as React from "react";
import * as Types from "./types";

declare function PanelDashboard(props: {
  as?: React.ElementType;
  slotPanelCard?: Types.Devlink.Slot;
  isPanelEmtpty?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
