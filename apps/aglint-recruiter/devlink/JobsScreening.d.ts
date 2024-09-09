import * as React from "react";
import * as Types from "./types";

declare function JobsScreening(props: {
  as?: React.ElementType;
  onClickExportCsv?: Types.Devlink.RuntimeProps;
  onClickSortBy?: Types.Devlink.RuntimeProps;
  onClickResumeMatchAsc?: Types.Devlink.RuntimeProps;
  onClickFilter?: Types.Devlink.RuntimeProps;
  textShowResults?: React.ReactNode;
  slotSearchInput?: Types.Devlink.Slot;
  slotJobScreeningCards?: Types.Devlink.Slot;
  slotScreeningLeft?: Types.Devlink.Slot;
}): React.JSX.Element;