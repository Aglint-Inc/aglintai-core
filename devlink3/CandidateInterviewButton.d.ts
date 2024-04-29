import * as React from "react";
import * as Types from "./types";

declare function CandidateInterviewButton(props: {
  as?: React.ElementType;
  onClickButton?: Types.Devlink.RuntimeProps;
  textButton?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
