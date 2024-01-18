import * as React from "react";
import * as Types from "./types";

declare function PhoneScreening(props: {
  as?: React.ElementType;
  slotWelcomeText?: Types.Devlink.Slot;
  slotQuestions?: Types.Devlink.Slot;
  slotEndText?: Types.Devlink.Slot;
  onclickPreview?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
