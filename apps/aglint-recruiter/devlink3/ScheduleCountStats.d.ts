import * as React from "react";
import * as Types from "./types";

declare function ScheduleCountStats(props: {
  as?: React.ElementType;
  textCompletedCount?: React.ReactNode;
  textIncreasedCompleted?: React.ReactNode;
  textNotScheduledCount?: React.ReactNode;
  textIncreasedNotScheduled?: React.ReactNode;
  textWaitingCount?: React.ReactNode;
  textIncreasedWaiting?: React.ReactNode;
  textConfirmedCount?: React.ReactNode;
  textIncreasedConfirmed?: React.ReactNode;
  textCancelledCount?: React.ReactNode;
  textIncreasedCancelled?: React.ReactNode;
}): React.JSX.Element;
