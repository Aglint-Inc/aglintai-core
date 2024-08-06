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
}): React.JSX.Element;
