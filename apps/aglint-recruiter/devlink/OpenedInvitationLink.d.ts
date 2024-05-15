import * as React from "react";
import * as Types from "./types";

declare function OpenedInvitationLink(props: {
  as?: React.ElementType;
  slotCompanyImage?: Types.Devlink.Slot;
  textTitle?: React.ReactNode;
  textDuration?: React.ReactNode;
  textPlatform?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
  slotTable?: Types.Devlink.Slot;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
