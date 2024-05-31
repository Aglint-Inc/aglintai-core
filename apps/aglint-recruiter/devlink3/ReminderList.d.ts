import * as React from "react";
import * as Types from "./types";

declare function ReminderList(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textReminder?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
