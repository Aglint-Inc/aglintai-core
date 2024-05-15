import * as React from "react";
import * as Types from "./types";

declare function ScoreCard(props: {
  as?: React.ElementType;
  slotScorePills?: Types.Devlink.Slot;
  textHeading?: React.ReactNode;
  colorPropsHeading?: Types.Devlink.RuntimeProps;
  slotAddButton?: Types.Devlink.Slot;
}): React.JSX.Element;
