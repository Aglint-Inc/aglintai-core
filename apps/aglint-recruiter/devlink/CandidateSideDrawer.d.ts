import * as React from "react";
import * as Types from "./types";

declare function CandidateSideDrawer(props: {
  as?: React.ElementType;
  slotNewTabPill?: Types.Devlink.Slot;
  slotTabContent?: Types.Devlink.Slot;
  slotBasicInfo?: Types.Devlink.Slot;
  slotTopBar?: Types.Devlink.Slot;
}): React.JSX.Element;
