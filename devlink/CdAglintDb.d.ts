import * as React from "react";
import * as Types from "./types";

declare function CdAglintDb(props: {
  as?: React.ElementType;
  onClickEditQuery?: Types.Devlink.RuntimeProps;
  slotToggle?: Types.Devlink.Slot;
  onClickCandidateData?: Types.Devlink.RuntimeProps;
  textHeader?: React.ReactNode;
  slotCheckbox?: Types.Devlink.Slot;
  slotCdTableAglint?: Types.Devlink.Slot;
  isSelectedVisible?: Types.Visibility.VisibilityConditions;
  onClickCloseSelected?: Types.Devlink.RuntimeProps;
  textNoCandidateSelected?: React.ReactNode;
  onClickBookmark?: Types.Devlink.RuntimeProps;
  isHeaderVisible?: Types.Visibility.VisibilityConditions;
  slotViewSaveList?: Types.Devlink.Slot;
  slotEmailOut?: Types.Devlink.Slot;
}): React.JSX.Element;
