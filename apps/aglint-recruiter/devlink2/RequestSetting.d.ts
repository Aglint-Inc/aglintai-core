import * as React from "react";
import * as Types from "./types";

declare function RequestSetting(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotToolsEnables?: Types.Devlink.Slot;
  slotCustomize?: Types.Devlink.Slot;
  slotAutoPilotToggle?: Types.Devlink.Slot;
  slotAiFrequency?: Types.Devlink.Slot;
}): React.JSX.Element;
