import * as React from "react";
import * as Types from "./types";

declare function HeaderWithSlot(props: {
  as?: React.ElementType;
  isCoordinatorVisible?: Types.Visibility.VisibilityConditions;
  slotCoordinators?: Types.Devlink.Slot;
  textHeading?: React.ReactNode;
}): React.JSX.Element;
