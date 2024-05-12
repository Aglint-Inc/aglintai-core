import * as React from "react";
import * as Types from "./types";

declare function ChatMessage(props: {
  as?: React.ElementType;
  slotProfile?: Types.Devlink.Slot;
  textHeading?: React.ReactNode;
  slotMessages?: Types.Devlink.Slot;
  slotMessageCard?: Types.Devlink.Slot;
  isMessageCardVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
