import * as React from "react";
import * as Types from "./types";

declare function TeamInvitesBlock(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  name?: React.ReactNode;
  email?: React.ReactNode;
}): React.JSX.Element;
