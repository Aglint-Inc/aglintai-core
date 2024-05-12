import * as React from "react";
import * as Types from "./types";

declare function CandidateStart(props: {
  as?: React.ElementType;
  slotStartButton?: Types.Devlink.Slot;
  slotLogo?: Types.Devlink.Slot;
  textWelcome?: React.ReactNode;
}): React.JSX.Element;
