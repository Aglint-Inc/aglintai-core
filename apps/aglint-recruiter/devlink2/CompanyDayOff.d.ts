import * as React from "react";
import * as Types from "./types";

declare function CompanyDayOff(props: {
  as?: React.ElementType;
  slotDayoffList?: Types.Devlink.Slot;
  slotAddButton?: Types.Devlink.Slot;
  slotLearnButton?: Types.Devlink.Slot;
}): React.JSX.Element;
