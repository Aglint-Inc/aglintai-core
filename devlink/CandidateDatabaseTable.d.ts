import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseTable(props: {
  as?: React.ElementType;
  textCandidateCount?: React.ReactNode;
  slotButtonOutlinedPrimary?: Types.Devlink.Slot;
  slotCandidateRows?: Types.Devlink.Slot;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotCandidateDetails?: Types.Devlink.Slot;
  slotPagination?: Types.Devlink.Slot;
  onClickAiSearch?: Types.Devlink.RuntimeProps;
  propsOpacity?: Types.Devlink.RuntimeProps;
  slotAddtoJob?: Types.Devlink.Slot;
  slotFilter?: Types.Devlink.Slot;
  slotSort?: Types.Devlink.Slot;
}): React.JSX.Element;
