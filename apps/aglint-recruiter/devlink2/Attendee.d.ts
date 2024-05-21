import * as React from "react";
import * as Types from "./types";

declare function Attendee(props: {
  as?: React.ElementType;
  slotToggle?: Types.Devlink.Slot;
  isCheckBox?: Types.Visibility.VisibilityConditions;
  slotSelectedMemberPill?: Types.Devlink.Slot;
  slotRCheckbox?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  slotSearchInput?: Types.Devlink.Slot;
  isSearchInput?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
