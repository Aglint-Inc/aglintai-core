import * as React from "react";
import * as Types from "./types";

declare function SidedrawerBodyDebrief(props: {
  as?: React.ElementType;
  slotSessionNameInput?: Types.Devlink.Slot;
  slotDurationDropdown?: Types.Devlink.Slot;
  slotScheduleTypeDropdown?: Types.Devlink.Slot;
  slotLocationDropdown?: Types.Devlink.Slot;
  isLocation?: Types.Visibility.VisibilityConditions;
  slotMemberAvatarSelectionPill?: Types.Devlink.Slot;
  slotMembersDropdown?: Types.Devlink.Slot;
  slotAttendee?: Types.Devlink.Slot;
  isAttendeeVisible?: Types.Visibility.VisibilityConditions;
  textMembers?: React.ReactNode;
}): React.JSX.Element;
