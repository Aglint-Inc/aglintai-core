import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseTable(props: {
  as?: React.ElementType;
  textCandidateCount?: React.ReactNode;
  slotButtonOutlinedPrimary?: Types.Devlink.Slot;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  slotCandidateRows?: Types.Devlink.Slot;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotCandidateDetails?: Types.Devlink.Slot;
  slotPagination?: Types.Devlink.Slot;
}): React.JSX.Element;
