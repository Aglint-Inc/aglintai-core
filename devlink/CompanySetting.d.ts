import * as React from "react";
import * as Types from "./types";

declare function CompanySetting(props: {
  as?: React.ElementType;
  onClickCompanyInfo?: Types.Devlink.RuntimeProps;
  onClickCompanyJd?: Types.Devlink.RuntimeProps;
  onClickEmailTemplate?: Types.Devlink.RuntimeProps;
  slotSaved?: Types.Devlink.Slot;
  slotCompanyInfo?: Types.Devlink.Slot;
  slotCompanyJdSetting?: Types.Devlink.Slot;
  slotEmailTemplate?: Types.Devlink.Slot;
}): React.JSX.Element;
