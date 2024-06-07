import * as React from "react";
import * as Types from "./types";

declare function FilterPageLayout(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  slotBody?: Types.Devlink.Slot;
}): React.JSX.Element;
