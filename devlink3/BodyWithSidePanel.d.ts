import * as React from "react";
import * as Types from "./types";

declare function BodyWithSidePanel(props: {
  as?: React.ElementType;
  slotLeft?: Types.Devlink.Slot;
  slotRight?: Types.Devlink.Slot;
}): React.JSX.Element;
