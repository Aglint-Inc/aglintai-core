import * as React from "react";
import * as Types from "./types";

declare function UserProfile(props: {
  as?: React.ElementType;
  slotUserImage?: Types.Devlink.Slot;
  slotUserForm?: Types.Devlink.Slot;
  onClickUserInfoSave?: Types.Devlink.RuntimeProps;
  onClickPreferenceSave?: Types.Devlink.RuntimeProps;
  slotPreferenceForm?: Types.Devlink.Slot;
}): React.JSX.Element;
