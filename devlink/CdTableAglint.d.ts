import * as React from "react";
import * as Types from "./types";

declare function CdTableAglint(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  isBookMarked?: Types.Visibility.VisibilityConditions;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickBookmark?: Types.Devlink.RuntimeProps;
  notBookmark?: Types.Visibility.VisibilityConditions;
  bookMarked?: Types.Visibility.VisibilityConditions;
  onClickBookMarked?: Types.Devlink.RuntimeProps;
  slotCdExperienceCard?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
