import * as React from "react";
import * as Types from "./types";

declare function FeedbackCard(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  slotDesc?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
