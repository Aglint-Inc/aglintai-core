import * as React from "react";
import * as Types from "./types";

declare function PanelMember(props: {
  as?: React.ElementType;
  textMemberName?: React.ReactNode;
  slotMemberAvatar?: Types.Devlink.Slot;
}): React.JSX.Element;
