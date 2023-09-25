import * as React from "react";
import * as Types from "./types";

declare function NavMenuBottom(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textEmail?: React.ReactNode;
  isMyNotification?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
