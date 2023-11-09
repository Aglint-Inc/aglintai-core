import * as React from "react";
import * as Types from "./types";

declare function JobDetailsFilterBlock(props: {
  as?: React.ElementType;
  textFilterInfo?: React.ReactNode;
  filterCount?: React.ReactNode;
  slotSearch?: Types.Devlink.Slot;
  onClickUpload?: Types.Devlink.RuntimeProps;
  slotFilter?: Types.Devlink.Slot;
  isAddCandidatesVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
