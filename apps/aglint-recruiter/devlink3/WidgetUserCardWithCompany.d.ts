import * as React from "react";
import * as Types from "./types";

declare function WidgetUserCardWithCompany(props: {
  as?: React.ElementType;
  isSelected?: Types.Visibility.VisibilityConditions;
  textJobTitle?: React.ReactNode;
  textCompanyName?: React.ReactNode;
  textDate?: React.ReactNode;
  textName?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotUserAvatar?: Types.Devlink.Slot;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
