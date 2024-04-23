import * as React from "react";
import * as Types from "./types";

declare function ChatBlock(props: {
  as?: React.ElementType;
  testName?: React.ReactNode;
  textTime?: React.ReactNode;
  textMessage?: React.ReactNode;
  slotAvatar?: Types.Devlink.Slot;
  slotWidget?: Types.Devlink.Slot;
  isWidget?: Types.Visibility.VisibilityConditions;
  istext?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
