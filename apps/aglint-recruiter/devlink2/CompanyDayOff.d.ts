import * as React from "react";
import * as Types from "./types";

declare function CompanyDayOff(props: {
  as?: React.ElementType;
  slotDayOff?: Types.Devlink.Slot;
  onClickAddDate?: Types.Devlink.RuntimeProps;
  slotDayoffList?: Types.Devlink.Slot;
  onClickImport?: Types.Devlink.RuntimeProps;
  onClickAddDayoff?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
