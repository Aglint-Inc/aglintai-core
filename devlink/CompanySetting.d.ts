import * as React from "react";
import * as Types from "./types";

declare function CompanySetting(props: {
  as?: React.ElementType;
  onClickCompanyInfo?: Types.Devlink.RuntimeProps;
  onClickCompanyJd?: Types.Devlink.RuntimeProps;
  onClickEmailTemplate?: Types.Devlink.RuntimeProps;
  slotCompanyInfo?: Types.Devlink.Slot;
  slotCompanyJdSetting?: Types.Devlink.Slot;
  slotEmailTemplate?: Types.Devlink.Slot;
  isSaved?: Types.Visibility.VisibilityConditions;
  isSaving?: Types.Visibility.VisibilityConditions;
  slotSavingLottie?: Types.Devlink.Slot;
  slotTeam?: Types.Devlink.Slot;
  onClickTeam?: Types.Devlink.RuntimeProps;
  isTeamVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
