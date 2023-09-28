import * as React from "react";
import * as Types from "./types";

declare function DetailedFeedbackCard(props: {
  as?: React.ElementType;
  textHeader?: React.ReactNode;
  textDescription?: React.ReactNode;
  slotScore?: Types.Devlink.Slot;
  textScorePercentage?: React.ReactNode;
  textColorScore?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
