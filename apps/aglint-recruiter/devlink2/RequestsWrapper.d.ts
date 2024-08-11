import * as React from "react";
import * as Types from "./types";

declare function RequestsWrapper(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  slotRequestSection?: Types.Devlink.Slot;
}): React.JSX.Element;
