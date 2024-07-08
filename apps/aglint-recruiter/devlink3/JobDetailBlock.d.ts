import * as React from "react";
import * as Types from "./types";

declare function JobDetailBlock(props: {
  as?: React.ElementType;
  slotJobForm?: Types.Devlink.Slot;
  slotRichtext?: Types.Devlink.Slot;
  onClickCreate?: Types.Devlink.RuntimeProps;
  isCreate?: Types.Visibility.VisibilityConditions;
  textDescription?: React.ReactNode;
  styleBorder?: Types.Devlink.RuntimeProps;
  slotRichtextWarning?: Types.Devlink.Slot;
  slotHiringTeamForm?: Types.Devlink.Slot;
  isJobDetailVisible?: Types.Visibility.VisibilityConditions;
  isHiringTeamVisible?: Types.Visibility.VisibilityConditions;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
