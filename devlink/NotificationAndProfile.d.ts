import * as React from "react";
import * as Types from "./types";

declare function NotificationAndProfile(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textNotificationCOunt?: React.ReactNode;
  isNotificationCountVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
