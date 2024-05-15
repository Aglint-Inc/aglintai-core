import * as React from "react";
import * as Types from "./types";

declare function ChatNotification(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textMain?: React.ReactNode;
  textSub?: React.ReactNode;
  isSubtextVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
