import * as React from "react";
import * as Types from "./types";

declare function InterviewStart(props: {
  as?: React.ElementType;
  slotAiProfile?: Types.Devlink.Slot;
  nameText?: React.ReactNode;
  onClickStart?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
