import * as React from "react";
import * as Types from "./types";

declare function BrowseAssessment(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotBrowseCard?: Types.Devlink.Slot;
  slotSearch?: Types.Devlink.Slot;
  onClickAddSelectedTemplates?: Types.Devlink.RuntimeProps;
  textTemplatesCount?: React.ReactNode;
  isSelected?: Types.Visibility.VisibilityConditions;
  isYourAssessment?: Types.Visibility.VisibilityConditions;
  isAglintAssessment?: Types.Visibility.VisibilityConditions;
  onClickAglintAssessment?: Types.Devlink.RuntimeProps;
  onClickYourAssessment?: Types.Devlink.RuntimeProps;
  slotEmpty?: Types.Devlink.Slot;
}): React.JSX.Element;
