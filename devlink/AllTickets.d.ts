import * as React from "react";
import * as Types from "./types";

declare function AllTickets(props: {
  as?: React.ElementType;
  slotTicketList?: Types.Devlink.Slot;
  slotSearch?: Types.Devlink.Slot;
  onClickAllTicketCheck?: Types.Devlink.RuntimeProps;
  isAllTicketChecked?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
