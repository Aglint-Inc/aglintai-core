import * as React from "react";
import * as Types from "./types";

declare function ScoreCard(props: {
  as?: React.ElementType;
  slotScorePills?: Types.Devlink.Slot;
  onClickAdd?: Types.Devlink.RuntimeProps;
  textAddButton?: React.ReactNode;
  textHeading?: React.ReactNode;
  colorPropsHeading?: Types.Devlink.RuntimeProps;
  slotAddCard?: Types.Devlink.Slot;
  slotAddButton?: Types.Devlink.Slot;
}): React.JSX.Element;
