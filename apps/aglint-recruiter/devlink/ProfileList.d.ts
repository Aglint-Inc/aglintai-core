import * as React from "react";
import * as Types from "./types";

declare function ProfileList(props: {
  as?: React.ElementType;
  slotUserImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textNumber?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  textJobTitle?: React.ReactNode;
  textDepartment?: React.ReactNode;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  textEmail?: React.ReactNode;
  isLinkedInVisible?: Types.Visibility.VisibilityConditions;
  onClickLinkedIn?: Types.Devlink.RuntimeProps;
  onClickRole?: Types.Devlink.RuntimeProps;
  isRoleLinkVisible?: Types.Visibility.VisibilityConditions;
  textManager?: React.ReactNode;
  isManagerVisible?: Types.Visibility.VisibilityConditions;
  onClickManagerLink?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
