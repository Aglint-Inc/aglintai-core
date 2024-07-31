import * as React from "react";
import * as Types from "./types";

declare function CompanyInfoDetails(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textCompanyName?: React.ReactNode;
  textCompanySites?: React.ReactNode;
  slotEditButton?: Types.Devlink.Slot;
  slotDetails?: Types.Devlink.Slot;
  slotSocialLink?: Types.Devlink.Slot;
}): React.JSX.Element;
