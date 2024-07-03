import * as React from "react";
import * as Types from "./types";

declare function AvatarWithName(props: {
  as?: React.ElementType;
  isReverseShadowVisible?: Types.Visibility.VisibilityConditions;
  isShadowVisible?: Types.Visibility.VisibilityConditions;
  slotAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  isRoleVisible?: Types.Visibility.VisibilityConditions;
  isTickVisible?: Types.Visibility.VisibilityConditions;
  isAvatarVisible?: Types.Visibility.VisibilityConditions;
  isCandidateIconVisible?: Types.Visibility.VisibilityConditions;
  isRoleHorizontalVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
