import * as React from "react";
import * as Types from "./types";

declare function Task(props: {
  as?: React.ElementType;
  slotSearchFilter?: Types.Devlink.Slot;
  slotTaskCard?: Types.Devlink.Slot;
}): React.JSX.Element;
