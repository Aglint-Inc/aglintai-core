import * as React from "react";
import * as Types from "./types";

declare function SubmittedCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textQuestionCount?: React.ReactNode;
  slotInviteStatus?: Types.Devlink.Slot;
  slotResponseCard?: Types.Devlink.Slot;
}): React.JSX.Element;
