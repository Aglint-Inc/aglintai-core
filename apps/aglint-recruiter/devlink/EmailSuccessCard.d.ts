import * as React from "react";
import * as Types from "./types";

declare function EmailSuccessCard(props: {
  as?: React.ElementType;
  textEmail?: React.ReactNode;
  textSubject?: React.ReactNode;
  slotBodyText?: Types.Devlink.Slot;
  textSentMail?: React.ReactNode;
  textStatus?: React.ReactNode;
}): React.JSX.Element;
