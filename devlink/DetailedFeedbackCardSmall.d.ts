import * as React from "react";
import * as Types from "./types";

declare function DetailedFeedbackCardSmall(props: {
  as?: React.ElementType;
  textHeader?: React.ReactNode;
  textScorePercentage?: React.ReactNode;
  slotScore?: Types.Devlink.Slot;
  textDescription?: React.ReactNode;
  textColorScore?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
