import * as React from "react";
import * as Types from "./types";

declare function JobDetail(props: {
  as?: React.ElementType;
  slotJobDetail?: Types.Devlink.Slot;
  slotShareJob?: Types.Devlink.Slot;
}): React.JSX.Element;
