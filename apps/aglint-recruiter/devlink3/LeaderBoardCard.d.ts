import * as React from "react";
import * as Types from "./types";

declare function LeaderBoardCard(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  noHours?: React.ReactNode;
  textHour?: React.ReactNode;
  noInterview?: React.ReactNode;
  textInterview?: React.ReactNode;
  textCountNo?: React.ReactNode;
}): React.JSX.Element;
