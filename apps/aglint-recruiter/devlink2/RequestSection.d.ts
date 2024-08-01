import * as React from "react";
import * as Types from "./types";

declare function RequestSection(props: {
  as?: React.ElementType;
  slotRequestCard?: Types.Devlink.Slot;
  textSectionHeader?: React.ReactNode;
}): React.JSX.Element;
