import * as React from "react";
import * as Types from "./types";

declare function UserProfile(props: {
  as?: React.ElementType;
  slotUserImage?: Types.Devlink.Slot;
  slotUserForm?: Types.Devlink.Slot;
  slotPreferenceForm?: Types.Devlink.Slot;
  slotEmail?: Types.Devlink.Slot;
  onClickEmailChange?: Types.Devlink.RuntimeProps;
  onClickProfilePhotoChange?: Types.Devlink.RuntimeProps;
  slotUserInfoBtn?: Types.Devlink.Slot;
  slotPreferencesBtn?: Types.Devlink.Slot;
  slotPassword?: Types.Devlink.Slot;
  slcotpasswo?: Types.Devlink.Slot;
}): React.JSX.Element;
