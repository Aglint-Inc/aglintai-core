import * as React from "react";
import * as Types from "./types";

declare function DeleteCard(props: {
  as?: React.ElementType;
  textHeading?: React.ReactNode;
  textDesc?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
