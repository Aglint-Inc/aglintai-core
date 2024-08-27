import * as React from "react";
import * as Types from "./types";

declare function AtsSettings(props: {
  as?: React.ElementType;
  slotAtsIcon?: Types.Devlink.Slot;
  slotConnectIcon?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  slotSyncItems?: Types.Devlink.Slot;
  slotFrequencySync?: Types.Devlink.Slot;
  textSyncItems?: React.ReactNode;
  textAtsConnected?: React.ReactNode;
  slotAiInstructionsTextArea?: Types.Devlink.Slot;
  onClickEditApi?: Types.Devlink.RuntimeProps;
  onClickDisconnect?: Types.Devlink.RuntimeProps;
  slotCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
