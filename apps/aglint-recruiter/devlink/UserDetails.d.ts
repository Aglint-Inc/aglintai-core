import * as React from "react";
import * as Types from "./types";

declare function UserDetails(props: {
  as?: React.ElementType;
  slotUserImage?: Types.Devlink.Slot;
  onClickProfilePhotoChange?: Types.Devlink.RuntimeProps;
  slotUserForm?: Types.Devlink.Slot;
  slotUserInfoBtn?: Types.Devlink.Slot;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
  slotClose?: Types.Devlink.Slot;
}): React.JSX.Element;
