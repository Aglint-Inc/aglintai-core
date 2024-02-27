import * as React from "react";
import * as Types from "./types";

declare function WidgetTimeGroup(props: {
  as?: React.ElementType;
  textTime?: React.ReactNode;
  slotTimeRange?: Types.Devlink.Slot;
}): React.JSX.Element;
