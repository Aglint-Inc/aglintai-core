import * as React from "react";
import * as Types from "./types";

declare function OptionAvailableCard(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  slotCardDate?: Types.Devlink.Slot;
}): React.JSX.Element;
