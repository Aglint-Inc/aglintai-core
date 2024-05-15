import * as React from "react";
import * as Types from "./types";

declare function DayoffList(props: {
  as?: React.ElementType;
  textDayoff?: React.ReactNode;
  textDate?: React.ReactNode;
  slotTextWithBg?: Types.Devlink.Slot;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
