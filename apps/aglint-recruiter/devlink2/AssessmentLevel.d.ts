import * as React from "react";
import * as Types from "./types";

declare function AssessmentLevel(props: {
  as?: React.ElementType;
  slotLevelIcon?: Types.Devlink.Slot;
  textLevel?: React.ReactNode;
}): React.JSX.Element;
