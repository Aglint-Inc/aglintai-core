import * as React from "react";
import * as Types from "./types";

declare function IntegrationCard(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  isConnectedVisible?: Types.Visibility.VisibilityConditions;
  onClickCopyLink?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  textLink?: React.ReactNode;
  isComingSoon?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
