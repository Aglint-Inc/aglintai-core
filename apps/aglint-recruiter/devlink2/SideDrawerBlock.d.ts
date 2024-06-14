import * as React from "react";
import * as Types from "./types";

declare function SideDrawerBlock(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickPrimaryButton?: Types.Devlink.RuntimeProps;
  textPrimaryButton?: React.ReactNode;
  slotSidedrawerBody?: Types.Devlink.Slot;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
