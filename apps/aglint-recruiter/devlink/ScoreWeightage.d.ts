import * as React from "react";
import * as Types from "./types";

declare function ScoreWeightage(props: {
  as?: React.ElementType;
  slotScoreWheel?: Types.Devlink.Slot;
  slotScorePercent?: Types.Devlink.Slot;
  slotResetButton?: Types.Devlink.Slot;
}): React.JSX.Element;
