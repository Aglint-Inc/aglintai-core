import * as React from "react";
import * as Types from "./types";

declare function ScheduleCollapseCard(props: {
  as?: React.ElementType;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textTitle?: React.ReactNode;
  textTime?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  slotAvatarCandidate?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  slotPannelAvatar?: Types.Devlink.Slot;
  isUpcomingVisible?: Types.Visibility.VisibilityConditions;
  isCompletedVisible?: Types.Visibility.VisibilityConditions;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
