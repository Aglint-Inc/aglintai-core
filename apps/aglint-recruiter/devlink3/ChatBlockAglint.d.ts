import * as React from "react";
import * as Types from "./types";

declare function ChatBlockAglint(props: {
  as?: React.ElementType;
  textMessage?: React.ReactNode;
  slotWidget?: Types.Devlink.Slot;
  isWidgetVisible?: Types.Visibility.VisibilityConditions;
  textTime?: React.ReactNode;
  isTextVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
