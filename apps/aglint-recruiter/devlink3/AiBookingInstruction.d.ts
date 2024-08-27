import * as React from "react";
import * as Types from "./types";

declare function AiBookingInstruction(props: {
  as?: React.ElementType;
  slotTextArea?: Types.Devlink.Slot;
  textHowTo?: React.ReactNode;
  textExample?: React.ReactNode;
}): React.JSX.Element;
