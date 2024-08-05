import * as React from "react";
import * as Types from "./types";

declare function RequestOption(props: {
  as?: React.ElementType;
  textOption?: React.ReactNode;
  slotCountBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
