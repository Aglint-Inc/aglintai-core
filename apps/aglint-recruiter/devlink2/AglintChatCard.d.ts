import * as React from "react";
import * as Types from "./types";

declare function AglintChatCard(props: {
  as?: React.ElementType;
  isAglintLogoVisible?: Types.Visibility.VisibilityConditions;
  isUserLogoVisible?: Types.Visibility.VisibilityConditions;
  textMessage?: React.ReactNode;
  textTime?: React.ReactNode;
  textName?: React.ReactNode;
  slotUserImage?: Types.Devlink.Slot;
}): React.JSX.Element;
