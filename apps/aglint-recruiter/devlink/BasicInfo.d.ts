import * as React from "react";
import * as Types from "./types";

declare function BasicInfo(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  onClickChangeLogo?: Types.Devlink.RuntimeProps;
  textLogoUpdate?: React.ReactNode;
  slotBasicForm?: Types.Devlink.Slot;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
  isChangeLogoVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
