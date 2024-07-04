import * as React from "react";
import * as Types from "./types";

declare function SideDrawerLarge(props: {
  as?: React.ElementType;
  slotSideDrawerbody?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickPrimary?: Types.Devlink.RuntimeProps;
  textPrimaryButton?: React.ReactNode;
  textDrawertitle?: React.ReactNode;
  isBottomBar?: Types.Visibility.VisibilityConditions;
  onClickBack?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  dynamicHeight?: Types.Devlink.RuntimeProps;
  slotButtons?: Types.Devlink.Slot;
}): React.JSX.Element;
