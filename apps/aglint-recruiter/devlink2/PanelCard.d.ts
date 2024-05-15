import * as React from "react";
import * as Types from "./types";

declare function PanelCard(props: {
  as?: React.ElementType;
  textPanelName?: React.ReactNode;
  textMemberCount?: React.ReactNode;
  slotAvatarGroup?: Types.Devlink.Slot;
}): React.JSX.Element;
