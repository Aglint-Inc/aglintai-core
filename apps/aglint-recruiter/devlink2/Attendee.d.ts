import * as React from "react";
import * as Types from "./types";

declare function Attendee(props: {
  as?: React.ElementType;
  slotToggle?: Types.Devlink.Slot;
  slotSelectedMemberPill?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
}): React.JSX.Element;
