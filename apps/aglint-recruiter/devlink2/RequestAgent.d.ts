import * as React from "react";
import * as Types from "./types";

declare function RequestAgent(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textTopStatus?: React.ReactNode;
  slotRequestOption?: Types.Devlink.Slot;
  slotRequestSection?: Types.Devlink.Slot;
  slotAiInput?: Types.Devlink.Slot;
  slotAiBody?: Types.Devlink.Slot;
  textAiHeader?: React.ReactNode;
  slotFilter?: Types.Devlink.Slot;
  slotAglintAiChat?: Types.Devlink.Slot;
}): React.JSX.Element;
