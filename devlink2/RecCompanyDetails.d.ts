import * as React from "react";
import * as Types from "./types";

declare function RecCompanyDetails(props: {
  as?: React.ElementType;
  slotMain?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
  slotStatusText?: Types.Devlink.Slot;
}): React.JSX.Element;
