import * as React from "react";
import * as Types from "./types";

declare function SelectedDateAndTime(props: {
  as?: React.ElementType;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  slotSessionAndTime?: Types.Devlink.Slot;
}): React.JSX.Element;
