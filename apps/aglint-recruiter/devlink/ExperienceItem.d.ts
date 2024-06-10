import * as React from "react";
import * as Types from "./types";

declare function ExperienceItem(props: {
  as?: React.ElementType;
  slotBadge?: Types.Devlink.Slot;
  slotCompanyLogo?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textDate?: React.ReactNode;
  textCompanyName?: React.ReactNode;
}): React.JSX.Element;
