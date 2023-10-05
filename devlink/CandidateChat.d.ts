import * as React from "react";
import * as Types from "./types";

declare function CandidateChat(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textCompany?: React.ReactNode;
  textStatus?: React.ReactNode;
  bgColorPropsStatus?: Types.Devlink.RuntimeProps;
  textTicketId?: React.ReactNode;
  slotChatInbox?: Types.Devlink.Slot;
  slotTypeMessage?: Types.Devlink.Slot;
}): React.JSX.Element;
