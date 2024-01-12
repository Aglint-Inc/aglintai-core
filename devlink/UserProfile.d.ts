import * as React from "react";
import * as Types from "./types";

declare function UserProfile(props: {
  as?: React.ElementType;
  slotPreferenceForm?: Types.Devlink.Slot;
  slotPreferencesBtn?: Types.Devlink.Slot;
  slotNavSublink?: Types.Devlink.Slot;
  slotInfo?: Types.Devlink.Slot;
}): React.JSX.Element;
