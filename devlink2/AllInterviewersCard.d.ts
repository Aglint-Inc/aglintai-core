import * as React from "react";
import * as Types from "./types";

declare function AllInterviewersCard(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textUpcomingInterviews?: React.ReactNode;
  textCompletedInterviews?: React.ReactNode;
  slotInterviewModules?: Types.Devlink.Slot;
  textPosition?: React.ReactNode;
}): React.JSX.Element;
