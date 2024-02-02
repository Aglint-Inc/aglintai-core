import * as React from "react";
import * as Types from "./types";

declare function AssistantApplicantCount(props: {
  as?: React.ElementType;
  slotIntegrationLogo?: Types.Devlink.Slot;
  applicantCount?: React.ReactNode;
  countTopMatch?: React.ReactNode;
  slotBarGraph?: Types.Devlink.Slot;
  countGoodMatch?: React.ReactNode;
  countAverageMatch?: React.ReactNode;
  countPoorMatch?: React.ReactNode;
  countNotMatch?: React.ReactNode;
}): React.JSX.Element;
