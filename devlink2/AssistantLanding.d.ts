import * as React from "react";
import * as Types from "./types";

declare function AssistantLanding(props: {
  as?: React.ElementType;
  isFilterVisible?: Types.Visibility.VisibilityConditions;
  slotTask?: Types.Devlink.Slot;
  slotChat?: Types.Devlink.Slot;
}): React.JSX.Element;
