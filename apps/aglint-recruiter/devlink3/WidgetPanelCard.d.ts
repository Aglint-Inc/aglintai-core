import * as React from "react";
import * as Types from "./types";

declare function WidgetPanelCard(props: {
  as?: React.ElementType;
  textPanelName?: React.ReactNode;
  textMemberCount?: React.ReactNode;
  slotAvatarGroup?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
