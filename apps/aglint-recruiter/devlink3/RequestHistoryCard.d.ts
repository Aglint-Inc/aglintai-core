import * as React from "react";
import * as Types from "./types";

declare function RequestHistoryCard(props: {
  as?: React.ElementType;
  slotStatus?: Types.Devlink.Slot;
  slotAssignedTo?: Types.Devlink.Slot;
  textHistory?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
