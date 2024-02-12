import * as React from "react";
import * as Types from "./types";

declare function PageLayout(props: {
  as?: React.ElementType;
  slotTopbarLeft?: Types.Devlink.Slot;
  slotTopbarRight?: Types.Devlink.Slot;
  slotBody?: Types.Devlink.Slot;
}): React.JSX.Element;
